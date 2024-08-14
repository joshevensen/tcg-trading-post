import utils from "..";
import type { CardNew, SetNew } from "~/db/types";

const lorcastBaseURL = "https://api.lorcast.com";

async function getSets() {
  const { data } = await utils.http.get(`${lorcastBaseURL}/v0/sets`);

  return data;
}

async function getCards(setCode: string) {
  const { data } = await utils.http.get(`${lorcastBaseURL}/v0/cards/search?q=set:${setCode}`);

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

function convertCard(lorcastCard: any, gameId: string, setId: string) {
  const urls = lorcastCard.image_uris.digital;
  const imageUrl = urls.normal || urls.large || urls.small;

  const newCard: CardNew = {
    number: String(lorcastCard.collector_number),
    name: lorcastCard.name,
    text: lorcastCard.text,
    flavorText: lorcastCard.flavor_text,
    imageUrl,
    illustrators: lorcastCard.illustrators,
    tcgPlayerId: String(lorcastCard.tcgplayer_id),
    gameId,
    setId,
  };

  return {
    newCard,
  }
}

const lorcanaUtil = {
  lorcastBaseURL,
  getSets,
  getCards,
  convertSet,
  convertCard,
};

export default lorcanaUtil;
