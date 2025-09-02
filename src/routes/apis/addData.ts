export function POST(_req: Request){
    const _body = _req.body;
    console.log(`Body : ${_body}`)
    if(_body){
        return new Response(`No body received`)
    }
    return new Response(`Body received`)
}