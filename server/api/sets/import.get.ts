import { GameGetOne } from "~/db/api/GameAPI";
import { SetStore, SetUpsert } from "~/db/api/SetAPI";
import utils from "~/utils";

/**
 * Import Sets for a Game
 */
export default defineEventHandler(async (event) => {
  const { gameId }: { gameId: string } = getQuery(event);

  const game = await GameGetOne(gameId);

  if (!game) {
    console.log("no game found");
    event.node.res.end();
  }

  try {
    let gameUtil = null;

    switch (game!.name) {
      case "Lorcana":
        gameUtil = utils.games.lorcana;
        break;
    }

    if (gameUtil) {
      const sets = await gameUtil.getSets();

      sets.results.forEach(async (result: any) => {
        const newSet = gameUtil.convertSet(result, gameId);
        await SetUpsert(newSet);
      });
    }

    console.log("imported");

    event.node.res.end();
  } catch (error) {
    console.log("error", error);
  }
});
