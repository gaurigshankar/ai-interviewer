import { sql } from "@vercel/postgres";

export const executeQuery = async (user:string) => {
    const { rows } = await sql`SELECT * from CARTS where user_id=${user}`;
    return rows;
}