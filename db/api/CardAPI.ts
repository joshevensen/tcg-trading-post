import utils from "@/utils";
import type { CardNew, Card, Faction, Rarity } from "../types";
import type { Card as DefaultCard } from "@prisma/client";

const include = {
  Set: true,
  Types: true,
  Rarity: true,
  Faction: true,
  Attributes: true,
};

/**
 * GetAll
 */
export async function CardGetAll(
  gameId: string,
  setId: string,
  factionId?: string
) {
  if (factionId !== "undefined") {
    return await utils.db.card.findMany({
      orderBy: [{ number: "asc" }],
      where: { AND: { gameId, setId, factionId } },
      include,
    });
  }

  return await utils.db.card.findMany({
    orderBy: [{ number: "asc" }],
    where: { AND: { gameId, setId } },
    include,
  });
}

/**
 * GetOne
 */
export async function CardGetOne(CardId: string) {
  return await utils.db.card.findUnique({
    where: { id: CardId },
    include,
  });
}

/**
 * Store
 */
export async function CardStore(newCard: CardNew) {
  const result = await utils.db.card.create({ data: newCard });

  return result;
}

/**
 * Upsert
 */
export async function CardUpsert(newCard: CardNew) {
  const gameId = newCard.gameId;
  const setId = newCard.setId;
  const number = newCard.number;
  const existingCard = await utils.db.card.findUnique({
    where: { cardId: { gameId, setId, number } },
  });

  if (existingCard) return existingCard;

  return CardStore(newCard);
}

/**
 * Update
 */
export async function CardUpdate(updatedCard: Card) {
  const result = await utils.db.card.update({
    where: { id: updatedCard.id },
    data: updatedCard as DefaultCard,
  });

  return result;
}

/**
 * Connect
 */
export async function CardConnect(
  card: Card,
  relationship: "Faction" | "Rarity",
  itemId: string
) {
  await utils.db.card.update({
    where: { id: card.id },
    data: {
      [relationship]: {
        connect: { id: itemId },
      },
    },
  });
}

/**
 * Delete
 */
export async function CardDelete(CardId: string) {
  const result = await utils.db.card.delete({ where: { id: CardId } });

  return result;
}
