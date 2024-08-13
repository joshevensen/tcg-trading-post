import { CardConnect, CardUpsert } from "~/db/api/CardAPI";
import utils from "~/utils";

export default defineEventHandler(async (event) => {
  try {
    const { setId } = getQuery(event);

    const set = await utils.db.set.findUnique({
      where: { id: String(setId) },
    });

    if (!set) return {};

    const url = `${utils.lorcast.baseURL}/v0/cards/search?q=set:${set.code}`;

    // @ts-ignore
    const { data } = await utils.http.get(url);

    data.results.forEach(async (result: any) => {
      const urls = result.image_uris.digital;
      const imageUrl = urls.normal || urls.large || urls.small;

      const newCard = await CardUpsert({
        name: result.name,
        setId: set.id,
        setCode: set.code,
        setNumber: result.collector_number,
        inkColor: utils.lorcast.getInk(result.ink),
        isInkable: result.inkwell,
        version: result.version || "",
        cost: result.cost,
        strength: result.strength,
        willpower: result.willpower,
        lore: result.lore,
        moveCost: result.move_cost,
        text: result.text,
        flavorText: result.flavor_text,
        imageUrl,
        releasedAt: new Date(result.released_at),
        rarity: utils.lorcast.getRarity(result.rarity),
        layout: utils.lorcast.getLayout(result.layout),
        tcgplayerId: result.tcgplayer_id,
      });

      result.type.forEach(async (type: string) => {
        await CardConnect(newCard, "Types", type);
      });

      if (result.classifications) {
        result.classifications.forEach(async (classification: string) => {
          await CardConnect(newCard, "Classifications", classification);
        });
      }

      if (result.keywords) {
        result.keywords.forEach(async (keyword: string) => {
          await CardConnect(newCard, "Keywords", keyword);
        });
      }

      result.illustrators.forEach(async (illustrator: string) => {
        await CardConnect(newCard, "Illustrators", illustrator);
      });
    });

    event.node.res.end();
  } catch (error) {
    console.log("error", error);
  }
});
