import { AttributeGetAll } from "~/db/api/AttributeAPI";

export default defineEventHandler(async () => {
  const attributes = await AttributeGetAll();
  return { attributes: attributes };
});
