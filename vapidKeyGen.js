import { webPush } from "./deps.ts";

function generateVapidKeys() {
  const vapidKeys = webPush.generateVAPIDKeys();
  console.log(vapidKeys);
}

generateVapidKeys();
