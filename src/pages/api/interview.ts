// pages/api/interview.ts

import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the API key from the cookie
  const { apiKey } = cookie.parse(req.headers.cookie || "");

  if (!apiKey) {
    return res.status(401).json({ error: "API key not found in cookies." });
  }

  // Initialize OpenAI with the API key from the cookie
  const configuration = {
    apiKey: apiKey,
  };

  const openai = new OpenAI(configuration);

  // Handle the request (e.g., generate questions, evaluate answers)
  // For simplicity, let"s assume we"re generating a question

  const prompt = req.body.prompt || "Hello, how can I assist you today?";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({ result: completion.choices[0].message });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
