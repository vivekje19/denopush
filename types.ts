export type { format } from "https://deno.land/std@0.91.0/datetime/mod.ts";

export interface IendPoint {
  _id: { $oid: string };
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
  appName: string;
  userID: string;
  clientID: string;
  createdAt: true;
}

export interface IclientUser {
  _id: { $oid: string };
  clientID: string;
  apiKey: string;
  clientName: string;
  clientIP: string;
  clientDomain: string;
}
