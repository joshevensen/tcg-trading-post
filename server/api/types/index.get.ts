import { TypeGetAll } from "~/db/api/TypeAPI";

export default defineEventHandler(async () => {
  const types = await TypeGetAll();
  return { types: types };
});
