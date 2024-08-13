import { SetGetAll } from "../../../db/api/SetAPI";

export default defineEventHandler(async () => {
  const sets = await SetGetAll();
  return { sets: sets };
});
