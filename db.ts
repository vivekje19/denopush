import { config, MongoClient } from "./deps.ts";

const dbclient = new MongoClient();
await dbclient.connect(config()["MONGO_URL"]);
export const db = dbclient.database("pushNotifications");
