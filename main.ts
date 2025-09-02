import handler from "./src/index.ts";
import { connectDB } from "./src/connectDb.ts";

const port: number = 3000;

try {
    connectDB()
} catch (_e) {
    console.error(`Error while connecting database. Switching to non database operations. \nError : ${_e}`)
}

Deno.serve({ port: port }, handler);
