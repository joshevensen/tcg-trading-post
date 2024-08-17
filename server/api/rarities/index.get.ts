import { RarityGetAll } from "~/db/api/RarityAPI";

export default defineEventHandler(async () => {
  const rarities = await RarityGetAll();
  return { rarities: rarities };
});
