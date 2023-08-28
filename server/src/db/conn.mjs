import { MongoClient } from "mongodb";

const connectionString = process.env.MONGO_DB_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log('Connected to Database')
} catch(e) {
  console.error(e);
}

let db = conn.db(process.env.DB_NAME);

export default db;