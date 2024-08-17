import utils from "..";
import _ from "lodash";
import type { Attribute, CardNew, Faction, SetNew, Type } from "~/db/types";

const lorcastBaseURL = "https://api.lorcast.com";

async function getSets() {
  const { data } = await utils.http.get(`${lorcastBaseURL}/v0/sets`);

  return data;
}

async function getCards(setCode: string) {
  const { data } = await utils.http.get(
    `${lorcastBaseURL}/v0/cards/search?q=set:${setCode}`
  );

  return data;
}

function convertSet(lorcastSet: any, gameId: string) {
  const newSet: SetNew = {
    name: lorcastSet.name,
    code: lorcastSet.code,
    releaseDate: new Date(lorcastSet.released_at),
    gameId: gameId,
  };

  return newSet;
}

function convertCard(
  lorcastCard: any,
  gameId: string,
  setId: string,
  factions: Faction[]
) {
  const urls = lorcastCard.image_uris.digital;
  const imageUrl = urls.normal || urls.large || urls.small;

  const card: CardNew = {
    number: _.padStart(String(lorcastCard.collector_number), 3, "0"),
    name: lorcastCard.name,
    text: lorcastCard.text,
    flavorText: lorcastCard.flavor_text,
    imageUrl,
    illustrators: lorcastCard.illustrators,
    tcgPlayerId: String(lorcastCard.tcgplayer_id),
    gameId,
    setId,
  };

  const faction = factions.find((faction) => faction.name === lorcastCard.ink);
  const rarity = "";
  const types: Type[] = [];
  const attributes: Attribute[] = [];

  return {
    card,
    faction,
    rarity,
    types,
    attributes,
  };
}

const lorcanaUtil = {
  lorcastBaseURL,
  getSets,
  getCards,
  convertSet,
  convertCard,
};

export default lorcanaUtil;
