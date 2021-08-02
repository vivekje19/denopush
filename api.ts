export function sendPush(
  userID: string,
  clientID: string,
  apiKey: string,
  endpoint: string,
) {
  const pushData = {
    userID: userID,
    title: "Thanks for registration",
    message: "You are activated for receiving push notification",
    site: "",
    role: "",
    sound: "",
    url: "",
    ttl: "",
    vtitle: "",
    icon:
      "https://msoportal.chikitsamitra.co.in/static/media/chikitsamitra.0f334442.png",
    badge:
      "https://msoportal.chikitsamitra.co.in/static/media/chikitsamitra.0f334442.png",
    image:
      "https://www.chikitsamitra.net.in/static/d2a714cfc13e5f3f9b95875d446eb5cf/80bd7/Storyboard-EClinic_ndf1bg.webp",
    data: "Self",
    tag: "",
    endpoint: endpoint,
  };
  const dataForSending = { ...pushData };
  fetch("http://localhost:8000/send", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      clientID: clientID,
      apiKey: apiKey,
    },
    body: JSON.stringify(dataForSending),
  });
}
