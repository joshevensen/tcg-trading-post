import { CardGetAll } from "~/db/api/CardAPI";

export default defineEventHandler(async (event) => {
  const { gameId }: { gameId: string } = getQuery(event);
  const { setId }: { setId: string } = getQuery(event);
  const { factionId }: { factionId: string } = getQuery(event);

  const cards = await CardGetAll(gameId, setId, factionId);
  return { cards: cards };
});
