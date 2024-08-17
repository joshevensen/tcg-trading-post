import { CardConnect, CardUpsert } from "~/db/api/CardAPI";
import { FactionGetAll } from "~/db/api/FactionAPI";
import { GameGetOne } from "~/db/api/GameAPI";
import { SetGetOne } from "~/db/api/SetAPI";
import utils from "~/utils";

export default defineEventHandler(async (event) => {
  const { gameId }: { gameId: string } = getQuery(event);
  const { setId }: { setId: string } = getQuery(event);

  const game = await GameGetOne(gameId);
  const set = await SetGetOne(setId);

  if (!game || !set) {
    console.log("no game or set found");
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
      const cards = await gameUtil.getCards(set!.code);
      const factions = await FactionGetAll();

      cards.results.forEach(async (result: any) => {
        const { card, faction } = gameUtil.convertCard(
          result,
          gameId,
          setId,
          factions
        );
        const newCard = await CardUpsert(card);
        if (faction) await CardConnect(newCard, "Faction", faction.id);

        // Rarity
        // Types
        // Attributes
      });
    }

    console.log("imported");

    event.node.res.end();
  } catch (error) {
    console.log("error", error);
  }
});
