
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hola, soy tu asistente de tenis. Pregúntame sobre torneos, reglamentos o rankings FET, COSAT o ITF." }
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
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h1>🎾 Asistente Tenis Ecuador</h1>
      <div style={{ maxHeight: 400, overflowY: 'auto', marginBottom: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe tu pregunta aquí..."
          style={{ flex: 1 }}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}
