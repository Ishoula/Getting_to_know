
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `
You are an AI assistant representing I.Shoula, a full-stack developer.

Answer ONLY based on the following:

Skills:
- React, Next.js, Node.js, Express
- MongoDB, PostgreSQL
- Backend architecture, APIs

Personality:
- Professional
- Clear and concise
- Confident but not arrogant

Rules:
- If you don't know, say "You can contact me for more details."
- Keep answers short and helpful
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    }),
  });

  const data = await response.json();

  return NextResponse.json({
    reply: data.choices[0].message.content,
  });
}