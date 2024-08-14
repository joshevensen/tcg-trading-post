import utils from "..";
import type { SetNew } from "~/db/types";

const lorcastBaseURL = "https://api.lorcast.com";

async function getSets() {
  const { data } = await utils.http.get(`${lorcastBaseURL}/v0/sets`);

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

const lorcanaUtil = {
  lorcastBaseURL,
  getSets,
  convertSet,
};

export default lorcanaUtil;
