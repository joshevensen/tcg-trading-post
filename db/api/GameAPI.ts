import type { GameNew, Game } from "../types";
import type { Game as DefaultGame } from "@prisma/client";

/**
 * GetAll
 */
export async function GameGetAll() {
  return await utils.db.game.findMany({
    orderBy: [{ name: "asc" }],
    include: {
      _count: {
        select: { Cards: true },
      },
    },
  });
}

/**
 * GetOne
 */
export async function GameGetOne(GameId: string) {
  return await utils.db.game.findUnique({
    where: { id: GameId },
  });
}

/**
 * Store
 */
export async function GameStore(newGame: GameNew) {
  const result = await utils.db.game.create({ data: newGame });

  return result;
}

/**
 * Upsert
 */
// export async function GameUpsert(newGame: GameNew) {
//   const existingGame = await utils.db.game.findFirst({
//     where: { gameId_code: newGame.code },
//   });

//   if (existingGame) return existingGame;

//   const Game = GameStore(newGame);

//   return Game;
// }

/**
 * Update
 */
export async function GameUpdate(updatedGame: Game) {
  const result = await utils.db.game.update({
    where: { id: updatedGame.id },
    data: updatedGame as DefaultGame,
  });

  return result;
}

/**
 * Delete
 */
export async function GameDelete(GameId: string) {
  const result = await utils.db.game.delete({ where: { id: GameId } });

  return result;
}
