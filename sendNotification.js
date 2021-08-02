import { config } from "./deps.ts";
import webpush from "https://dev.jspm.io/web-push";

export async function sendNotification(pushSubscription, msg) {
  webpush.setVapidDetails(
    "mailto:developer@chikitsamitra.org",
    config()["VAPID_PUBLIC_KEY"],
    config()["VAPID_PRIVATE_KEY"],
  );

  try {
    const _resp = await webpush.sendNotification(
      { ...pushSubscription },
      JSON.stringify(msg),
    );
    //console.log(_resp);
  } catch (_e) {
    //console.error(e, "Error in sending");
  }
}
