import { config, Router } from "./deps.ts";
import { Context } from "./types.ts";
import { findAndSend, registerUser } from "./subscription.ts";
import {
  clientValidate,
  pushValidate,
  regReqValidatValidate,
} from "./clientAuthenticaion.ts";
export const router = new Router()
  .get("/", (ctx: Context): void => {
    ctx.response.body = { data: "Hello worlds!" };
  })
  .get("/vapidKey", (ctx: Context): void => {
    console.log(ctx.request);
    ctx.response.body = { key: config()["VAPID_PUBLIC_KEY"] };
  })
  .post("/submitEndPoint", clientValidate, regReqValidatValidate, registerUser)
  .post("/send", clientValidate, pushValidate, findAndSend);
