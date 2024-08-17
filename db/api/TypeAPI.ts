import utils from "@/utils";
import type { TypeNew, Type } from "../types";
import type { Type as DefaultType } from "@prisma/client";

/**
 * GetAll
 */
export async function TypeGetAll() {
  return await utils.db.type.findMany({
    orderBy: [{ name: "asc" }],
  });
}

/**
 * GetOne
 */
export async function TypeGetOne(TypeId: string) {
  return await utils.db.type.findUnique({
    where: { id: TypeId },
  });
}

/**
 * Store
 */
export async function TypeStore(newType: TypeNew) {
  const result = await utils.db.type.create({ data: newType });

  return result;
}

/**
 * Update
 */
export async function TypeUpdate(updatedType: Type) {
  const result = await utils.db.type.update({
    where: { id: updatedType.id },
    data: updatedType as DefaultType,
  });

  return result;
}

/**
 * Delete
 */
export async function TypeDelete(TypeId: string) {
  const result = await utils.db.type.delete({ where: { id: TypeId } });

  return result;
}
