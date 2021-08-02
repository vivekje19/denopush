import { Context } from "./deps.ts";
import { IendPoint } from "./types.ts";
import { db } from "./db.ts";
import { sendNotification } from "./sendNotification.js";
import { getTime } from "./time.ts";
import { sendPush } from "./api.ts";

export async function registerUser(ctx: Context): Promise<void> {
  const clientID = await ctx.request.headers.get("clientID") || "";
  const apiKey = await ctx.request.headers.get("apiKey") || "";
  const data = await ctx.request.body({ type: "json" }).value;

  const collection = db.collection<IendPoint>("endpointData");
  const _insertId = await collection.insertOne({
    ...data,
    clientID: clientID,
    createdAt: getTime(),
  }).toString();
  if (_insertId) {
    sendPush(data.userID, clientID, apiKey, data.endpoint);

    ctx.response.status = 201;
    ctx.response.body = {
      status: true,
      data: "Registration successful done",
    };
  }
}

export async function findAndSend(ctx: Context): Promise<void> {
  // add the id query here
  const postMsg = await ctx.request.body({ type: "json" }).value;
  const clientID = await ctx.request.headers.get("clientID") || "";
  const userID = postMsg?.userID;
  const endpoint = postMsg?.endpoint;
  var query: { [k: string]: unknown } = {};

  if (userID != "" && endpoint == "") {
    query.clientID = clientID;
    query.userID = postMsg?.userID;
  } else if (userID != "" && endpoint != "") {
    query.clientID = clientID;
    query.userID = postMsg?.userID;
    query.endpoint = postMsg?.endpoint;
  } else {
    query.clientID = clientID;
  }

  const records: IendPoint[] = await db
    .collection<IendPoint>("endpointData")
    .find(query, { noCursorTimeout: false })
    .toArray();

  for (const value of records) {
    console.log(value);
    if (
      Object.prototype.hasOwnProperty.call(value, "keys") &&
      Object.prototype.hasOwnProperty.call(value, "endpoint")
    ) {
      const data = {
        endpoint: value.endpoint,
        keys: value.keys,
      };
      const msg = {
        ...postMsg,
      };
      //sendNotification(data, msg);
      sendNotification(data, msg);
    } else {
      ctx.response.body = {
        status: 401,
        data: "Error in sending notification",
      };
      ctx.response.status = 401;
    }
  }

  ctx.response.body = {
    status: 200,
    data: "Notification has been sent successfully",
  };
  ctx.response.status = 200;
}
