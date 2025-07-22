export async function GET(_req: Request): Promise<Response> {
  const secret = Deno.env.get("SECRET");
  const encoder = new TextEncoder();
  const kryData = encoder.encode(secret);

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

  console.log(`New signature signed. Assigned at ${BufferToHex(signature)}`);
  return new Response(signature);
}
function BufferToHex(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);

  return Array.from(byteArray)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
