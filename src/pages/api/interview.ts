// pages/api/interview.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import cookie from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the API key from the cookie
  const { apiKey } = cookie.parse(req.headers.cookie || '');

  if (!apiKey) {
    return res.status(401).json({ error: 'API key not found in cookies.' });
  }

  // Initialize OpenAI with the API key from the cookie
  const configuration = new Configuration({
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);

  // Handle the request (e.g., generate questions, evaluate answers)
  // For simplicity, let's assume we're generating a question

  const prompt = req.body.prompt || 'Hello, how can I assist you today?';

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    res.status(200).json({ result: completion.data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
