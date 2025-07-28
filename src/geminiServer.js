// geminiServer.js (ESM-compatible)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.VITE_GOOGLE_GEMINI_API_KEY);

app.post('/gemini', async (req, res) => {
  console.log("HISTORY:");
  console.log(req.body.history);
  console.log("MESSAGE");
  console.log(req.body.message);
  console.log("PURPOSE");
  console.log(req.headers.purpose);

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  let chat;
  let msg = '';

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
  
  if(req.headers.purpose === "generate-itinerary") {
    console.log("Cities from frontend:", req.body.cities);
    console.log("Interests from frontend: ", req.body.interests);
    chat = model.startChat({
      systemInstruction: {
        role: 'system',
        parts: [
          {
            text: 'Your task is to generate an itinerary for a trip to Taiwan. Only include selected cities.'
          },
        ],
      },
    });
    msg = `
      Generate a detailed travel itinerary (limit 500 words) for a trip to Taiwan. 
      You must ONLY include the following cities in the itinerary: ${req.body.cities.join(", ")}.
      Do NOT include any other cities, especially not Taipei, unless it is specifically listed above.

      Trip details:
      - Duration: ${req.body.days} days
      - Interests: ${req.body.interests.join(", ")}
      - Adults: ${req.body.adults}
      - Children: ${req.body.children}
      - Budget: ${req.body.budget}

      Avoid suggesting cities not listed. Focus only on the cities provided.
      `;
  }

  const result = await chat.sendMessage(msg, {
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });

  const response = result.response;
  const text = response.text();
  res.send(text);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
