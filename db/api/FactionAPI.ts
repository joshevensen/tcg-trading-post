import utils from "@/utils";
import type { FactionNew, Faction } from "../types";
import type { Faction as DefaultFaction } from "@prisma/client";

/**
 * GetAll
 */
export async function FactionGetAll() {
  return await utils.db.faction.findMany({
    orderBy: [{ name: "asc" }],
  });
}

/**
 * GetOne
 */
export async function FactionGetOne(FactionId: string) {
  return await utils.db.faction.findUnique({
    where: { id: FactionId },
  });
}

/**
 * Store
 */
export async function FactionStore(newFaction: FactionNew) {
  const result = await utils.db.faction.create({ data: newFaction });

  return result;
}

/**
 * Update
 */
export async function FactionUpdate(updatedFaction: Faction) {
  const result = await utils.db.faction.update({
    where: { id: updatedFaction.id },
    data: updatedFaction as DefaultFaction,
  });

  return result;
}

/**
 * Delete
 */
export async function FactionDelete(FactionId: string) {
  const result = await utils.db.faction.delete({ where: { id: FactionId } });

  return result;
}
