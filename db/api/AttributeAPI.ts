import utils from "@/utils";
import type { AttributeNew, Attribute } from "../types";
import type { Attribute as DefaultAttribute } from "@prisma/client";

/**
 * GetAll
 */
export async function AttributeGetAll() {
  return await utils.db.attribute.findMany({
    orderBy: [{ name: "asc" }],
  });
}

/**
 * GetOne
 */
export async function AttributeGetOne(AttributeId: string) {
  return await utils.db.attribute.findUnique({
    where: { id: AttributeId },
  });
}

/**
 * Store
 */
export async function AttributeStore(newAttribute: AttributeNew) {
  const result = await utils.db.attribute.create({ data: newAttribute });

  return result;
}

/**
 * Update
 */
export async function AttributeUpdate(updatedAttribute: Attribute) {
  const result = await utils.db.attribute.update({
    where: { id: updatedAttribute.id },
    data: updatedAttribute as DefaultAttribute,
  });

  return result;
}

/**
 * Delete
 */
export async function AttributeDelete(AttributeId: string) {
  const result = await utils.db.attribute.delete({
    where: { id: AttributeId },
  });

  return result;
}
