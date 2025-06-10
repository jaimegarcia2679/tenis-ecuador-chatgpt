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
    <div style={{ maxWidth: 900, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: 10 }}>🎾 Asistente Tenis Ecuador</h1>

      <div style={{ marginBottom: 25 }}>
        <p>
          Hola, soy tu asistente de tenis. Pregúntame sobre torneos, reglamentos o rankings FET, COSAT o ITF.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <h3>🔗 Enlaces útiles:</h3>
        <ul>
          <li><a href="https://fet.org.ec" target="_blank">Sitio oficial FET</a></li>
          <li><a href="https://cosat.org" target="_blank">Sitio oficial COSAT</a></li>
          <li><a href="https://cosat.tournamentsoftware.com" target="_blank">Torneos COSAT</a></li>
          <li><a href="https://cotecc.tournamentsoftware.com" target="_blank">Torneos Centroamerica (COTECC)</a></li>
          <li><a href="https://www.itftennis.com/en/tournament-calendar/" target="_blank">Calendario ITF oficial</a></li>
        </ul>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h3>📂 Archivos de su interés:</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <h4>📄 Documentos</h4>
            <iframe src="/docs/Reglamento_2025_FET_compressed.pdf" width="100%" height="300px"></iframe>
            <a href="/docs/Reglamento_2025_FET_compressed.pdf" download>Descargar PDF</a>
          </div>
          <div>
            <h4>📊 Ranking</h4>
            <iframe src="/docs/Ranking_14A_2025.txt" width="100%" height="150px"></iframe>
            <a href="/docs/Ranking_14A_2025.txt" download>Descargar TXT</a>
          </div>
          <div>
            <h4>🖼️ Fotos</h4>
            <img src="/docs/foto_ejemplo.jpg" alt="Foto" style={{ maxWidth: "100%", borderRadius: "6px" }} />
            <br />
            <a href="/docs/foto_ejemplo.jpg" download>Descargar imagen</a>
          </div>
          <div>
            <h4>🎥 Video</h4>
            <video width="100%" height="240" controls>
              <source src="/docs/video_ejemplo.mp4" type="video/mp4" />
              Tu navegador no soporta video.
            </video>
            <a href="/docs/video_ejemplo.mp4" download>Descargar video</a>
          </div>
        </div>
      </section>

      <div style={{ backgroundColor: "#f9f9f9", padding: 15, borderRadius: 8, maxHeight: 300, overflowY: "auto", marginBottom: 20 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.role === "user" ? "right" : "left", margin: "5px 0" }}>
            <p><strong>{msg.role === "user" ? "Tú: " : "Asistente: "}</strong>{msg.content}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Escribe tu pregunta aquí..."
          style={{ flex: 1, padding: 10, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button onClick={handleSend} style={{ padding: "10px 20px" }}>Enviar</button>
      </div>
    </div>
  );
}
