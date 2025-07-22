import handler from "./src/index.ts";

const port: number = 3000

Deno.serve({port: port},handler);
