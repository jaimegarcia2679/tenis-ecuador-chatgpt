import { OpenAI } from "openai";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const loadPdfText = async (filename) => {
  try {
    const pdfPath = path.resolve(process.cwd(), "public/docs", filename);
    if (!fs.existsSync(pdfPath)) {
      throw new Error(`Archivo no encontrado: ${filename}`);
    }
    const buffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(buffer);
    return data.text;
  } catch (e) {
    console.error("Error al cargar PDF:", e.message);
    return "";
  }
};

export default async function handler(req, res) {
  const { messages } = req.body;

  try {
    const fetText = await loadPdfText("Reglamento_2025_FET_compressed.pdf");
    const rankingText = await loadPdfText("QUINTO_RANK_14VARONES_2025.pdf");

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
