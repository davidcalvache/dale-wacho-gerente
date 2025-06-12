
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ia", text: "Hola 👋 Soy tu asistente IA para turnos. Cuéntame qué necesitas." }
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensaje: input })
    });
    const data = await res.json();
    setMessages([...messages, { sender: "user", text: input }, { sender: "ia", text: data.respuesta }]);
    setInput("");
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>🧠 Asistente de Turnos IA</h1>
      <div style={{ height: 400, overflowY: 'auto', background: '#eee', padding: 10, marginBottom: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <div style={{
              display: 'inline-block',
              background: msg.sender === 'user' ? '#cce5ff' : '#ddd',
              padding: 10,
              borderRadius: 10,
              margin: 4
            }}>{msg.text}</div>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        placeholder="Ej: Pedro solo mañanas, Teresa está de baja..."
        style={{ width: '80%', padding: 8 }}
      />
      <button onClick={handleSend} style={{ padding: 8, marginLeft: 5 }}>Enviar</button>
    </div>
  );
}
