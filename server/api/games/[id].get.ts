import { GameGetOne } from "~/db/api/GameAPI";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const game = await GameGetOne(String(id));

  return { game: game };
});
