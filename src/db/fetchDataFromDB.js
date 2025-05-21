import { db } from "./db";

export const fetchDataFromDB = async () => {
   try {
    const state = await db.table("amdCollections").get("amdCollections");
    return state || {};
  } catch (e) {
    console.log({ e });
    return undefined;
  }
};
