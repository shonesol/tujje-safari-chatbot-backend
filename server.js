
tujje-safari-chatbot-backend/server.js
// =======================================
// TUJJE SAFARI AI CHATBOT BACKEND
// server.js
// =======================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

// OpenAI setup
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Home route (test if server is running)
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "TUJJE SAFARI AI is running successfully 🚀"
    });
});

// Chat endpoint
app.post("/chat", async (req, res) => {

    try {

        const message = req.body.message;

        const completion = await client.chat.completions.create({
            model: "gpt-4.1-mini",

            messages: [

                {
                    role: "system",
                    content: `
You are the official AI assistant for TUJJE SAFARIS.

Your role:
- Help tourists plan safaris in East Africa.
- Recommend destinations in Uganda, Kenya, Tanzania, Rwanda.
- Help with bookings, pricing inquiries, and travel guidance.
- Suggest game drives, gorilla trekking, chimpanzee tracking, boat cruises, hiking, and cultural tours.

Company details:

Name: TUJJE SAFARIS
WhatsApp: +256770462422
Email: tujjesafaris@gmail.com

Rules:
- Be friendly and professional.
- Always encourage users to book via WhatsApp.
- If asked about booking, say: "Contact us on WhatsApp +256770462422 to book your safari."
- Keep responses short and helpful.
`
                },

                {
                    role: "user",
                    content: message
                }

            ]
        });

        res.json({
            reply: completion.choices[0].message.content
        });

    } catch (error) {

        console.error("Chat error:", error);

        res.status(500).json({
            reply: "⚠️ TUJJE SAFARI AI is currently unavailable. Please try again later."
        });

    }
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`TUJJE SAFARI server running on port ${PORT}`);
});
