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
  const [calendar, setCalendar] = useState("");
  const [category, setCategory] = useState("");

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

  const handleCalendar = () => {
    let text = "";
    switch (category) {
      case "12":
        text = `📅 Calendario 2025 - Categoría 12 años\n\n• Enero - Gira COSAT (Colombia / Ecuador)\n• Marzo - Nacional Grado 1 - Guayaquil\n• Junio - Nacional Grado 1 - Quito\n• Septiembre - COSAT Bolivia\n• Noviembre - ITF J30 Paraguay (si clasifica)`;
        break;
      case "14":
        text = `📅 Calendario 2025 - Categoría 14 años\n\n• Enero - COSAT Perú y Colombia\n• Febrero - Nacional Grado 1 - Cuenca\n• Abril - COSAT Paraguay y Brasil\n• Agosto - Nacional Grado 1 - Manta\n• Octubre - COSAT Colombia\n• Diciembre - ITF J60 Chile (si clasifica)`;
        break;
      default:
        text = "Por favor selecciona una categoría válida (12 o 14 años).";
    }
    setCalendar(text);
  };

  return (
    <div style={{ fontFamily: "Segoe UI", backgroundColor: "#f6f8fb", minHeight: "100vh", padding: 20 }}>
      <header style={{ backgroundColor: "#0e4e78", color: "white", padding: "20px 30px", borderRadius: 8 }}>
        <h1 style={{ margin: 0 }}>🎾 Asistente Tenis Ecuador</h1>
        <nav style={{ marginTop: 10 }}>
          <a href="#enlaces" style={{ color: "white", marginRight: 20 }}>Enlaces</a>
          <a href="#archivos" style={{ color: "white", marginRight: 20 }}>Documentos</a>
          <a href="#media" style={{ color: "white", marginRight: 20 }}>Fotos & Videos</a>
          <a href="#calendario" style={{ color: "white", marginRight: 20 }}>Tu calendario</a>
          <a href="#chat" style={{ color: "white" }}>Chat</a>
        </nav>
      </header>

      <section id="enlaces" style={{ marginTop: 30 }}>
        <h3>🔗 Enlaces útiles:</h3>
        <ul>
          <li><a href="https://fet.org.ec" target="_blank">Sitio oficial FET</a></li>
          <li><a href="https://cosat.org" target="_blank">Sitio oficial COSAT</a></li>
          <li><a href="https://cosat.tournamentsoftware.com/tournament" target="_blank">Torneos COSAT</a></li>
          <li><a href="https://cotecc.tournamentsoftware.com/tournament" target="_blank">Torneos ITF (COTECC)</a></li>
          <li><a href="https://www.itftennis.com/en/tournament-calendar/" target="_blank">Calendario ITF oficial</a></li>
        </ul>
      </section>

      <section id="archivos" style={{ marginTop: 40 }}>
        <h3>📚 Biblioteca de Archivos:</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          <div style={{ flex: "1 1 45%" }}>
            <h4>📄 Documentos</h4>
            <iframe src="/docs/Reglamento_2025_FET_compressed.pdf" width="100%" height="300px"></iframe>
            <a href="/docs/Reglamento_2025_FET_compressed.pdf" download>Descargar PDF</a>
          </div>
          <div style={{ flex: "1 1 45%" }}>
            <h4>📊 Ranking</h4>
            <iframe src="/docs/Ranking_14A_2025.txt" width="100%" height="150px"></iframe>
            <a href="/docs/Ranking_14A_2025.txt" download>Descargar TXT</a>
          </div>
        </div>
      </section>

      <section id="media" style={{ marginTop: 40 }}>
        <h3>🖼️ Galería Multimedia:</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          <div style={{ flex: "1 1 45%" }}>
            <h4>📸 Foto</h4>
            <img src="/docs/foto_ejemplo.jpg" alt="Foto" style={{ width: "100%", borderRadius: 6 }} />
            <a href="/docs/foto_ejemplo.jpg" download>Descargar imagen</a>
          </div>
          <div style={{ flex: "1 1 45%" }}>
            <h4>🎥 Video</h4>
            <video width="100%" height="240" controls>
              <source src="/docs/video_ejemplo.mp4" type="video/mp4" />
              Tu navegador no soporta video.
            </video>
            <a href="/docs/video_ejemplo.mp4" download>Descargar video</a>
          </div>
        </div>
      </section>

      <section id="calendario" style={{ marginTop: 40 }}>
        <h3>📅 Tu calendario ideal 2025</h3>
        <label htmlFor="categoria">Selecciona tu categoría:</label>
        <select id="categoria" value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginLeft: 10, padding: 5 }}>
          <option value="">-- Elegir --</option>
          <option value="12">12 años</option>
          <option value="14">14 años</option>
        </select>
        <button onClick={handleCalendar} style={{ marginLeft: 10, padding: "5px 15px", backgroundColor: "#0e4e78", color: "white", border: "none", borderRadius: 4 }}>Ver calendario</button>
        {calendar && <pre style={{ backgroundColor: "white", padding: 15, marginTop: 15, whiteSpace: "pre-wrap", borderRadius: 4 }}>{calendar}</pre>}
      </section>

      <section id="chat" style={{ marginTop: 40 }}>
        <h3>💬 Asistente interactivo</h3>
        <div style={{ backgroundColor: "white", borderRadius: 8, padding: 15, maxHeight: 300, overflowY: "auto", marginBottom: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
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
          <button onClick={handleSend} style={{ padding: "10px 20px", backgroundColor: "#0e4e78", color: "white", border: "none", borderRadius: 4 }}>
            Enviar
          </button>
        </div>
      </section>
    </div>
  );
}
