import { MongoClient } from "npm:mongodb@6.17.0";

export async function connectDB() {
  const mongoDbUri = Deno.env.get("DBPATH");
  const mongoDbUser = Deno.env.get("DBUSER");

  if (!mongoDbUri) {
    console.error(
      `Error while connecting database. Considering checking on .env file (dbpath : ${mongoDbUri})`
    );
    Deno.exit(1);
  }

  const client = new MongoClient(mongoDbUri);

  try {
    await client.connect();
    await client.db(mongoDbUser).command({ ping: 1 });
    console.log("connected to database.");
  } catch (_err) {
    console.error(`Error while connection database :\n${_err}`);
  }

  const _db = client.db(mongoDbUser);
  const _list = _db.collection("Lists");

  return { _db, _list };
}
