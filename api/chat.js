export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  const messages = [
    { role: "system", content: "Você é o Serconhuk_Fit.AI, um coach motivacional com foco em saúde, treinos e alimentação." },
    { role: "user", content: req.body.message }
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: messages
    })
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}