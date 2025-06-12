
export default async function handler(req, res) {
  const { mensaje } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,

    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Eres un gerente experto en restaurantes de lujo. Organiza turnos del personal, resuelve incidencias y optimiza el servicio con criterio profesional."
        },
        { role: "user", content: mensaje }
      ],
      temperature: 0.5
    }),
  });

  const data = await response.json();
  res.status(200).json({ respuesta: data.choices[0].message.content });
}
