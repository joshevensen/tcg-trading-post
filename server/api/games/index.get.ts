import { GameGetAll } from "~/db/api/GameAPI";

export default defineEventHandler(async () => {
  const games = await GameGetAll();
  return { games: games };
});
