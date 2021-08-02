import { Context } from "./deps.ts";
import { IclientUser } from "./types.ts";
import { db } from "./db.ts";
import { bcrypt } from "./deps.ts";

const clientValidate = async (ctx: Context, next: () => Promise<unknown>) => {
  try {
    const clientID = await ctx.request.headers.get("clientID") || "";
    const apiKey = await ctx.request.headers.get("apiKey") || "";

    if (clientID == "") {
      ctx.response.body = {
        status: true,
        data: "Client-ID can not be empty",
      };
      ctx.response.status = 401;
    } else if (apiKey == "") {
      ctx.response.body = {
        status: true,
        data: "API-Key can not be empty",
      };
      ctx.response.status = 401;
    } else {
      const record = await db.collection<IclientUser>("client").findOne({
        "clientID": clientID,
      }, { noCursorTimeout: false }) || null;
      const fc = record?.clientID || "";
      if (fc == "") {
        ctx.response.body = {
          status: false,
          data: "Client ID is wrong",
        };
        ctx.response.status = 400;
      } else {
        const mongoKey = record?.apiKey || "";
        const result = bcrypt.compareSync(apiKey, mongoKey);
        if (result == false) {
          ctx.response.body = {
            status: false,
            data: "API-Key is wrong",
          };
          ctx.response.status = 400;
        } else {
          await next();
        }
      }

      // ctx.response.body = { "status": true, data: data };
      // ctx.response.status = 200;
    }
  } catch (err) {
    ctx.response.body = { status: false, data: null };
    ctx.response.status = 400;
    console.log(err);
  }
};

const regReqValidatValidate = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  try {
    const postMsg = await ctx.request.body({ type: "json" }).value;
    if (
      postMsg["endpoint"] == "" ||
      !Object.prototype.hasOwnProperty.call(postMsg, "endpoint")
    ) {
      ctx.response.body = {
        status: true,
        data: "Endpoint can not be empty",
      };
      ctx.response.status = 400;
    } else if (
      postMsg["keys"] == "" ||
      !Object.prototype.hasOwnProperty.call(postMsg, "keys")
    ) {
      ctx.response.body = {
        status: true,
        data: "Keys can not be empty",
      };
      ctx.response.status = 400;
    } else if (
      postMsg["keys"]["auth"] == "" ||
      !Object.prototype.hasOwnProperty.call(postMsg["keys"], "auth")
    ) {
      ctx.response.body = {
        status: true,
        data: "auth can not be empty",
      };
      ctx.response.status = 400;
    } else if (
      postMsg["keys"]["p256dh"] == "" ||
      !Object.prototype.hasOwnProperty.call(postMsg["keys"], "p256dh")
    ) {
      ctx.response.body = {
        status: true,
        data: "p256dh can not be empty",
      };
      ctx.response.status = 400;
    } else if (
      postMsg["userID"] == "" ||
      !Object.prototype.hasOwnProperty.call(postMsg, "userID")
    ) {
      ctx.response.body = {
        status: true,
        data: "User-ID can not be empty",
      };
      ctx.response.status = 400;
    } else {
      await next();
    }
  } catch (err) {
    ctx.response.body = { status: false, data: null };
    ctx.response.status = 400;
    console.log(err);
  }
};

const pushValidate = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  try {
    const postMsg = await ctx.request.body({ type: "json" }).value;
    if (
      postMsg["message"] == "" ||
      !Object.prototype.hasOwnProperty.call(postMsg, "message")
    ) {
      ctx.response.body = {
        status: true,
        data: "Message can not be empty",
      };
      ctx.response.status = 400;
    } else if (
      postMsg["title"] == "" ||
      !Object.prototype.hasOwnProperty.call(postMsg, "title")
    ) {
      ctx.response.body = {
        status: true,
        data: "Title can not be empty",
      };
      ctx.response.status = 400;
    } else {
      await next();
    }
  } catch (err) {
    ctx.response.body = { status: false, data: null };
    ctx.response.status = 400;
    console.log(err);
  }
};

export { clientValidate, pushValidate, regReqValidatValidate };
