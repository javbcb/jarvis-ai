import express from "express";
import Groq from "groq-sdk";

const app = express();

app.use(express.json());
app.use(express.static("public"));

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are JARVIS, a sophisticated, intelligent and friendly AI assistant. Speak like a polite British butler. Be helpful, witty and professional."
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "llama-3.3-70b-versatile"
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "JARVIS encountered a connection problem."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`JARVIS online on port ${PORT}`);
});
