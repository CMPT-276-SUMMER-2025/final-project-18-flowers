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
  const purpose = req.headers.purpose;
  const message = req.body.message;

  console.log("HISTORY:", req.body.history);
  console.log("MESSAGE:", message);
  console.log("PURPOSE:", purpose);

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  try {
    if (purpose === "chatbot-response") {
      const chat = model.startChat({
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

      const result = await chat.sendMessage(message, {
        generationConfig: {
          maxOutputTokens: 120,
        },
      });

      res.send(result.response.text());
    } 
    else if (purpose === "attraction-description") {
      const result = await model.generateContent(message);
      res.send(result.response.text());
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
