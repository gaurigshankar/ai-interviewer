// next-auth.d.ts

//import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
//import { JWT } from "next-auth/jwt";

// Extend User type
declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string | null;
  }

  interface Session {
    user?: {
      role?: string | null;
    } & DefaultSession["user"];
  }
}

// Extend JWT type
declare module "next-auth/jwt" {
  interface JWT {
    role?: string | null;
  }
}
