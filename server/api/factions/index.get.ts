import { FactionGetAll } from "~/db/api/FactionAPI";

export default defineEventHandler(async () => {
  const factions = await FactionGetAll();
  return { factions: factions };
});
