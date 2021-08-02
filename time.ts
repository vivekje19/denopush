import { format } from "https://deno.land/std@0.91.0/datetime/mod.ts";

export function getTime() {
  return format(new Date(), "yyyy-MM-dd HH:mm:ss");
}
