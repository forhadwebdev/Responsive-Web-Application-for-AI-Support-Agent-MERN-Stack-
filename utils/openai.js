import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateSupportReply({ botPersona, history, customerMessage }) {
  const messages = [
    { role: "system", content: botPersona },
    ...history.map((m) => ({
      role: m.sender === "customer" ? "user" : "assistant",
      content: m.text,
    })),
    { role: "user", content: customerMessage },
  ];

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.4,
    max_tokens: 300,
  });

  return completion.choices[0].message.content.trim();
}
