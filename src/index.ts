

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;
  const method = req.method;
  const body = JSON.stringify(req);
  let module;

  console.log(`url : ${url}`);
  console.log(`path : ${path}`);
  console.log(`method : ${method}`);
  console.log(`request info : ${body}`)
  try {
    module = await import(`./routes/${path}.ts`);
  } catch (_e) {
    return new Response(`path not found ${path}`, { status: 404 });
  }
  if (module[method]) {
    return module[method](req);
  }

  return new Response("Method not implemented", { status: 500 });
}
