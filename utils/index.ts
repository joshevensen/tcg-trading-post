import dateUtil from "./date";
import dbUtil from "./db";
import enumUtil from "./enum";
import lorcanaUtil from "./games/lorcana";
import httpUtil from "./http";

export default {
    date: dateUtil,
    db: dbUtil,
    enum: enumUtil,
    http: httpUtil,
    games: {
        lorcana: lorcanaUtil
    }
}