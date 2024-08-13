import utils from "../../utils";
import type { CardNew, Card } from "../types";
import type { Card as DefaultCard } from "@prisma/client";

/**
 * GetAll
 */
export async function CardGetAll(setId?: string) {
  const include = { Set: true, Types: true, BinderCards: true };

  if (setId) {
    return await utils.db.card.findMany({
      orderBy: [{ name: "asc" }],
      where: { setId },
      include,
    });
  }

  return await utils.db.card.findMany({
    orderBy: [{ name: "asc" }],
    include,
  });
}

/**
 * GetOne
 */
export async function CardGetOne(CardId: string) {
  return await utils.db.card.findUnique({
    where: { id: CardId },
  });
}

/**
 * Store
 */
export async function CardStore(newCard: CardNew) {
  const result = await utils.db.card.create({
    data: {
      name: newCard.name,
      setCode: newCard.setCode,
      setNumber: newCard.setNumber,
      inkColor: newCard.inkColor,
      isInkable: newCard.isInkable,
      version: newCard.version,
      cost: newCard.cost,
      strength: newCard.strength,
      willpower: newCard.willpower,
      lore: newCard.lore,
      moveCost: newCard.moveCost,
      text: newCard.text,
      flavorText: newCard.flavorText,
      imageUrl: newCard.imageUrl,
      releasedAt: newCard.releasedAt,
      rarity: newCard.rarity,
      layout: newCard.layout,
      tcgplayerId: String(newCard.tcgplayerId),
      Set: {
        connect: { id: newCard.setId },
      },
    },
  });

  return result;
}

/**
 * Upsert
 */
export async function CardUpsert(newCard: CardNew) {
  const existingCard = await utils.db.card.findFirst({
    where: {
      name: newCard.name,
      version: newCard.version,
      setCode: newCard.setCode,
      setNumber: newCard.setNumber,
    },
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
  relationship: "Classifications" | "Illustrators" | "Keywords" | "Types",
  name: string
) {
  await utils.db.card.update({
    where: { id: card.id },
    data: {
      [relationship]: {
        connectOrCreate: { where: { name }, create: { name } },
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
