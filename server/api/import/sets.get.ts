import { SetStore } from "~/db/api/SetAPI";
import { SetNew } from "~/db/types";
import utils from "~/utils";

export default defineEventHandler(async (event) => {
  try {
    // @ts-ignore
    const { results } = await utils.http.get(
      `${utils.games.lorcana.lorcastBaseURL}/v0/sets`
    );

    results.forEach(async (result: any) => {
      if (result.code === "cp") return null;

      const newSet: SetNew = {
        name: result.name,
        code: result.code,
        releaseDate: new Date(result.released_at),
        gameId: '',
      }
      await SetStore(newSet);
    });

    event.node.res.end();
  } catch (error) {
    console.log("error", error);
  }
});
