export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  const messages = [
    { role: "system", content: "Você é o Serconhuk_Fit.AI, um coach motivacional com foco em saúde, treinos e alimentação." },
    { role: "user", content: req.body.message }
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Erro ao obter resposta da IA.";
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "Erro ao conectar com a IA." });
  }
}