import { CardStore, CardUpsert } from "~/db/api/CardAPI";
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

      cards.results.forEach(async (result: any) => {
        const {newCard} = gameUtil.convertCard(result, gameId, setId);
        await CardUpsert(newCard);
      });
    }

      // result.type.forEach(async (type: string) => {
      //   await CardConnect(newCard, "Types", type);
      // });

      // if (result.classifications) {
      //   result.classifications.forEach(async (classification: string) => {
      //     await CardConnect(newCard, "Classifications", classification);
      //   });
      // }

      // if (result.keywords) {
      //   result.keywords.forEach(async (keyword: string) => {
      //     await CardConnect(newCard, "Keywords", keyword);
      //   });
      // }

      // result.illustrators.forEach(async (illustrator: string) => {
      //   await CardConnect(newCard, "Illustrators", illustrator);
      // });

    console.log("imported");

    event.node.res.end();
  } catch (error) {
    console.log("error", error);
  }
});
