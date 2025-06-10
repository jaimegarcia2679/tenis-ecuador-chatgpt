
import { OpenAI } from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const loadTextFile = (filename) => {
  try {
    const filePath = path.resolve(process.cwd(), "public/docs", filename);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Archivo no encontrado: ${filename}`);
    }
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.error("Error al leer archivo .txt:", e.message);
    return "";
  }
};

export default async function handler(req, res) {
  const { messages } = req.body;

  try {
    const fetText = loadTextFile("Reglamento_2025_FET.txt");
    const rankingText = loadTextFile("Ranking_14A_2025.txt");

    const context = `REGLAMENTO FET:\n${fetText}\n\nRANKING NACIONAL 14A:\n${rankingText}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Eres un asistente experto en tenis ecuatoriano. Responde basándote únicamente en el siguiente contexto:\n\n${context}`
        },
        ...messages
      ]
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error en /api/chat:", error.message);
    res.status(500).json({ reply: "Hubo un error procesando tu pregunta. Intenta nuevamente más tarde." });
  }
}
