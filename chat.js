
export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: req.body.messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: "Erro na resposta da OpenAI", details: data });
    }

    return res.status(200).json({ message: data.choices[0].message.content });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao conectar com a OpenAI", details: error.message });
  }
}
