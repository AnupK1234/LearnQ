const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs/promises");
const path = require("path");
const docxParser = require("docx-parser");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/test", (req, res) => {
  res.send("SERVER IS RUNNING")
})

// Route to process messages
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const prompt =
      "You are a teaching assistant. You need to solve students queries related to education.";
    const result = await model.generateContent([prompt, message]);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini error:", error.message || error);
    res.status(500).json({ error: "Failed to generate response from Gemini" });
  }
});

const upload = multer({ dest: "uploads/" });
// Helper to extract text from .docx file
const extractDocxText = (filePath) => {
  return new Promise((resolve, reject) => {
    docxParser.parseDocx(filePath, (data) => {
      if (data) resolve(data);
      else reject(new Error("Failed to parse DOCX"));
    });
  });
};

app.post("/summarize", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    let text = "";
    const ext = path.extname(file.originalname).toLowerCase();

    if (ext === ".pdf") {
      const dataBuffer = await fs.readFile(file.path);
      const parsed = await pdfParse(dataBuffer);
      text = parsed.text;
    } else if (ext === ".docx") {
      text = await extractDocxText(file.path);
    } else {
      return res
        .status(400)
        .json({ error: "Unsupported file format. Use PDF or DOCX." });
    }

    // Limit input size
    if (text.length > 10000) {
      text = text.slice(0, 10000);
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes documents in Markdown format.",
        },
        {
          role: "user",
          content: `Please summarize the following content in Markdown format:\n\n${text}`,
        },
      ],
      temperature: 0.5,
    });

    const summary = response.choices[0]?.message?.content;
    res.json({ markdownSummary: summary });
  } catch (err) {
    console.error("Summarization error:", err);
    res.status(500).json({ error: "Failed to summarize the file." });
  } finally {
    await fs.unlink(file.path); // Clean up uploaded file
  }
});

app.post("/flashcards", async (req, res) => {
  try {
    const { topic, additionalInfo } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const prompt = `
You are an AI assistant that creates educational flashcards.

Create exactly 3 flashcards in JSON array format.
Each flashcard should have the following structure:
{
  id: number,
  front: string, // the question
  back: string   // the answer
}

The topic is: "${topic}"
${additionalInfo ? `Additional context: ${additionalInfo}` : ""}

Only return the JSON array. Do not include any other explanation or formatting.
`;

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const rawContent = chatResponse.choices[0].message.content;

    // Try parsing the JSON content from the AI
    let flashcards;
    try {
      flashcards = JSON.parse(rawContent);
    } catch (parseErr) {
      return res.status(500).json({
        error:
          "Failed to parse flashcards response. Ensure the format is valid JSON.",
        raw: rawContent,
      });
    }

    res.json(flashcards);
  } catch (err) {
    console.error("Flashcard generation failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
