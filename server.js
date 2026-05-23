import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PUBLIC FOLDER SERVE
app.use(express.static(path.join(__dirname, "public")));

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

app.post("/generate-review", async (req, res) => {

  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });

    const prompt =
      "Write one short SEO friendly positive Google review for a paramedical institute in Delhi.";

    const result =
      await model.generateContent(prompt);

    const response =
      await result.response;

    const text = response.text();

    console.log(text);

    res.json({
      review: text
    });

  }

  catch (error) {

    console.log("FULL ERROR:");
    console.log(error);

    res.status(500).json({
      error: "AI generation failed"
    });

  }

});

app.listen(5000, () => {

  console.log("Server running on port 5000");

});