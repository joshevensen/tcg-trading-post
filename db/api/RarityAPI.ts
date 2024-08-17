import utils from "@/utils";
import type { RarityNew, Rarity } from "../types";
import type { Rarity as DefaultRarity } from "@prisma/client";

/**
 * GetAll
 */
export async function RarityGetAll() {
  return await utils.db.rarity.findMany({
    orderBy: [{ name: "asc" }],
  });
}

/**
 * GetOne
 */
export async function RarityGetOne(RarityId: string) {
  return await utils.db.rarity.findUnique({
    where: { id: RarityId },
  });
}

/**
 * Store
 */
export async function RarityStore(newRarity: RarityNew) {
  const result = await utils.db.rarity.create({ data: newRarity });

  return result;
}

/**
 * Update
 */
export async function RarityUpdate(updatedRarity: Rarity) {
  const result = await utils.db.rarity.update({
    where: { id: updatedRarity.id },
    data: updatedRarity as DefaultRarity,
  });

  return result;
}

/**
 * Delete
 */
export async function RarityDelete(RarityId: string) {
  const result = await utils.db.rarity.delete({ where: { id: RarityId } });

  return result;
}
