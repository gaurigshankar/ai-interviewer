// lib/auth.ts
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

// Define the types for the handler
type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

// Define the requireAuth function
export const requireAuth = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Get the session from the request
    const session = await getSession({ req });

    if (!session) {
      // If no session, return a 401 Unauthorized response
      res.status(401).json({ error: "Unauthorized access" });
      return;
    }

    // Add the session to the request object for access in the handler
    (req as any).session = session;

    // Proceed to the next handler
    return handler(req, res);
  };
};
