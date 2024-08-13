import type { SetNew, Set } from "../types";
import type { Set as DefaultSet } from "@prisma/client";

/**
 * GetAll
 */
export async function SetGetAll() {
  return await utils.db.set.findMany({
    orderBy: [{ code: "asc" }],
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
export async function SetGetOne(SetId: string) {
  return await utils.db.set.findUnique({
    where: { id: SetId },
  });
}

/**
 * Store
 */
export async function SetStore(newSet: SetNew) {
  const result = await utils.db.set.create({ data: newSet });

  return result;
}

/**
 * Upsert
 */
// export async function SetUpsert(newSet: SetNew) {
//   const existingSet = await utils.db.set.findFirst({
//     where: { gameId_code: newSet.code },
//   });

//   if (existingSet) return existingSet;

//   const set = SetStore(newSet);

//   return set;
// }

/**
 * Update
 */
export async function SetUpdate(updatedSet: Set) {
  const result = await utils.db.set.update({
    where: { id: updatedSet.id },
    data: updatedSet as DefaultSet,
  });

  return result;
}

/**
 * Delete
 */
export async function SetDelete(SetId: string) {
  const result = await utils.db.set.delete({ where: { id: SetId } });

  return result;
}
