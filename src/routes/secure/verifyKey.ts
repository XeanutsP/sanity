export default async function GET(_req: Request) {
  const secret = Deno.env.get("SECRET");
  const _requestData = _req.headers.get("x-hmac");
  const encoder = new TextEncoder();
  const kryData = encoder.encode(secret);
  let _validData = false;

  const currentKey = await crypto.subtle.importKey(
    "raw",
    kryData,
    {
      name: "HMAC",
      hash: { name: "SHA-256" },
    },
    false,
    ["sign", "verify"]
  );

  const message = "data for authenticate";
  const messageData = encoder.encode(message);
  const signature = await crypto.subtle.sign("HMAC", currentKey, messageData);
  if (await crypto.subtle.verify("HMAC", currentKey, signature, messageData)) {
    _validData = true;
  }
  if (_validData) {
    return new Response("Success");
  } else {
    return new Response("Fail");
  }
}
