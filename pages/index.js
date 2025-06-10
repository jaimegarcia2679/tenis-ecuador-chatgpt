import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hola, soy tu asistente de tenis. Pregúntame sobre torneos, reglamentos o rankings FET, COSAT o ITF."
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages })
    });
    const data = await response.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>🎾 Asistente Tenis Ecuador</h1>

      <p>
        Hola, soy tu asistente de tenis. Pregúntame sobre torneos, reglamentos o rankings FET, COSAT o ITF.
      </p>

      <div style={{ margin: "20px 0" }}>
        <h3>🔗 Enlaces útiles:</h3>
        <ul>
          <li>
            <a href="https://fet.org.ec" target="_blank" rel="noopener noreferrer">
              Sitio oficial FET
            </a>
          </li>
          <li>
            <a href="https://cosat.org" target="_blank" rel="noopener noreferrer">
              Sitio oficial COSAT
            </a>
          </li>
          <li>
            <a href="https://cosat.tournamentsoftware.com" target="_blank" rel="noopener noreferrer">
              Torneos COSAT (Software)
            </a>
          </li>
          <li>
            <a href="https://cotecc.tournamentsoftware.com" target="_blank" rel="noopener noreferrer">
              Torneos Centroamerica (Software)
            </a>
          </li>
          <li>
            <a href="https://www.itftennis.com/en/tournament-calendar/" target="_blank" rel="noopener noreferrer">
              Calendario ITF oficial
            </a>
          </li>
        </ul>
      </div>

      <div style={{ margin: "20px 0" }}>
        <h3>📂 Archivos de su interés:</h3>
        <ul>
          <li>
            <a href="/docs/Reglamento_2025_FET_compressed.pdf" download>
              📄 Documentos (Reglamento FET PDF)
            </a>
          </li>
          <li>
            <a href="/docs/Ranking_14A_2025.txt" download>
              📊 Ranking Nacional TXT
            </a>
          </li>
          <li>
            <a href="/docs/foto_ejemplo.jpg" download>
              🖼️ Fotos
            </a>
          </li>
          <li>
            <a href="/docs/video_ejemplo.mp4" download>
              🎥 Videos
            </a>
          </li>
          <li>
            <a href="/docs/otros.zip" download>
              📁 Varios (ZIP u otros formatos)
            </a>
          </li>
        </ul>
      </div>

      <div style={{ maxHeight: 400, overflowY: "auto", marginBottom: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Escribe tu pregunta aquí..."
          style={{ flex: 1 }}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}

