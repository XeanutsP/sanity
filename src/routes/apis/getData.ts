export function GET(_req: Request): Response {
    return new Response("Here's your data : "+_req.text(), {status:200});
}