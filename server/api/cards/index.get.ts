import { CardGetAll } from "~/db/api/CardAPI";

export default defineEventHandler(async () => {
  const cards = await CardGetAll();
  return { cards: cards };
});
