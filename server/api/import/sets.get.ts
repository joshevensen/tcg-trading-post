import { SetUpsert } from "~/db/api/SetAPI";
import utils from "~/utils";

export default defineEventHandler(async (event) => {
  try {
    // @ts-ignore
    const { results } = await utils.http.get(
      `${utils.lorcast.baseURL}/v0/sets`
    );

    results.forEach(async (result: any) => {
      if (result.code === "cp") return null;

      await SetUpsert({
        name: result.name,
        code: result.code,
        isMain: !!Number(result.code),
        releasedAt: new Date(result.released_at),
        prereleasedAt: new Date(result.prereleased_at),
      });
    });

    event.node.res.end();
  } catch (error) {
    console.log("error", error);
  }
});
