// geminiServer.js (ESM-compatible)
import express from 'express'; // library to handle HTTP request (e.g., POST, GET, etc.)
import cors from 'cors'; // library that fixes cross-origin issues (i.e. browser security)
import dotenv from 'dotenv'; // library that allows us to load .env with API key inside
import { GoogleGenerativeAI } from '@google/generative-ai'; // Gemini API SDK that'll allow us to talk to the API 

dotenv.config(); // Load API key from .env file

const app = express(); // app is our server
const PORT = 8000; // the server "app" will run on the "localhost:8000"

app.use(cors()); // allows frontend to talk to backend 
app.use(express.json()); // automatically parse JSON in incoming requests 

// create a genAI object for us to use to talk to Gemini
const genAI = new GoogleGenerativeAI(process.env.VITE_GOOGLE_GEMINI_API_KEY);

// MAIN CODE: When someone does a POST request to /gemini, runs this function that sends a package that contains purpose and message
app.post('/gemini', async (req, res) => {
  const purpose = req.headers.purpose; // tags/labels describing the package
  const message = req.body.message; // the actual contents of the package

  // choose which gemini model we're using, in this case we're using Gemini 2.5 Flash
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  // initialize a variable to hold the chat session
  let chat;
  // initialize the user's message as an empty string
  let msg = '';

  // main behaviour of the chatbot feature
  if(req.headers.purpose === "chatbot-response") {
    chat = model.startChat({
      history: req.body.history,
      systemInstruction: {
        role: 'system',
        parts: [
          {
            text: 'You are a chatbot designed to help the user with travel advice to Taiwan. If the user does not ask something related to Taiwan, tell them you cannot respond. Responses should not exceed 4 columns of text',
          },
        ],
      },
    });
    msg = req.body.message;
  }

  // in each attraction page, this block of code is used to generate a short description of the attraction
  if(req.headers.purpose === "attraction-description") {
    chat = model.startChat({
      systemInstruction: {
        role: 'system',
        parts: [
          {
            text: 'Your job is to generate a short description of the given city in Taiwan',
          },
        ],
      },
    });
    msg = req.body.message;
  }
  
  // creates an itinerary given input from user form 
  if(req.headers.purpose === "generate-itinerary") {
    console.log("Cities from frontend:", req.body.cities);
    console.log("Interests from frontend: ", req.body.interests);
    chat = model.startChat({
      systemInstruction: {
        role: 'system',
        parts: [
          {
            text: `Your task is to generate an itinerary for a trip to Taiwan. Only include selected cities. As well as embed a hidden comment block at the end containing coordinates for map routing in JSON format.
            Return content in this exact format:
            ---
            [Itinerary in Markdown]
            <!--
            [
              { "name": "Taipei 101", "lat": 25.033964, "lng": 121.564468 },
              { "name": "Rainbow Village", "lat": 24.1332, "lng": 120.6492 }
            ]
            -->
            `,
          },
        ],
      },
    });
    // ensure that gemini is told to use markdown well such that ReactMarkDown can present a good looking generated itinerary
    msg = `
    Generate a detailed travel itinerary (MAX 1000 words) for a trip to Taiwan.
    
    You must ONLY include these cities in the itinerary: ${req.body.cities.join(", ")}.  
    Do NOT include any other cities, especially not Taipei, unless it is specifically listed above.
    
      ---
      
      ### FORMAT INSTRUCTIONS (YOU MUST FOLLOW THIS EXACT STRUCTURE):
      For **each city**, follow this format:
      
      # City Name (Day X-Y)
      
      Then for each **day** within that city's stay:
      
      ## Day X  
      - ### **Morning**:  
        - Attraction 1  
        - Attraction 2  
      - ### **Afternoon**:  
        - Attraction 1  
        - Attraction 2  
      - ### **Night**:  
        - Attraction 1  
        - Attraction 2
      
      Use Markdown-style headers as shown above. Do **not** skip any time blocks. No generic filler like “explore the city” unless it’s tied to a specific activity. Use bullet points. Do NOT include headings like “Itinerary” or “Trip Overview”. Add more details about each attraction and make sure its consistent format.
      
      ---
    
    Trip details you must conform to:
    - Duration: ${req.body.days} days
    - Interests: ${req.body.interests.join(", ")}
    - Number of adults: ${req.body.adults}
    - Number of children: ${req.body.children}
    - Budget range: ${req.body.budget}

    After all days are done, provide a brief budget overview, including estimated costs.
    
    At the end of the response, return only this:

    <!--
    [
      { "name": "Taipei 101", "lat": 25.033964, "lng": 121.564468 },
      { "name": "Rainbow Village", "lat": 24.1332, "lng": 120.6492 }
    ]
    -->

    IMPORTANT: 
    - This block must be **valid JSON**, wrapped in <!-- -->
    - No Markdown, no headings, no extra text
    - Only one JSON array, not multiple
    `;
  }

  /*
msg = `
      Generate a detailed travel itinerary (limit 500 words) for a trip to Taiwan. 
      You must ONLY include the following cities in the itinerary: ${req.body.cities.join(", ")}.
      Do NOT include any other cities, especially not Taipei, unless it is specifically listed above.

      Trip details :
      - Duration: ${req.body.days} days
      - Interests: ${req.body.interests.join(", ")}
      - Adults: ${req.body.adults}
      - Children: ${req.body.children}
      - Budget: ${req.body.budget}

      Avoid suggesting cities not listed. Focus only on the cities provided.
      `;
  */

  console.log("HISTORY:", req.body.history);
  console.log("MESSAGE:", message);
  console.log("PURPOSE:", purpose);

  try {
    if (purpose === "chatbot-response") {
      // chatbot messages
      const result = await chat.sendMessage(msg, {
        generationConfig: {
          maxOutputTokens: 120, // determines how much Gemini can generate
        },
      });
      res.send(result.response.text());
    } 
    // attraction page AI descriptions
    else if (purpose === "attraction-description") {
      const result = await chat.sendMessage(msg, {
        generationConfig: {
          maxOutputTokens: 500, // determines how much Gemini can generate
        }
      });
      res.send(result.response.text());
    } 
    // plan a trip AI generated itineraries
    else if(purpose === "generate-itinerary") {
      const result = await chat.sendMessage(msg);
      const fullText = result.response.text();

      const coordBlockMatch = fullText.match(/<!--([\s\S]*?)-->/);
      let routeCoordinates = [];
      if (coordBlockMatch) {
        const coordBlock = coordBlockMatch[1].trim();
        try {
          routeCoordinates = JSON.parse(coordBlock);
        } catch (err) {
          console.error("Failed to parse coordinates:", err);
        }
      }
      const cleanText = fullText.replace(/<!--[\s\S]*?-->/, '').trim();
      res.send({
        text: cleanText,
        routeCoordinates,
      });
    }
    else {
      res.status(400).send("Invalid purpose.");
    }
  } catch (err) {
    console.error("Error generating content:", err);
    res.status(500).send("Failed to generate content.");
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
