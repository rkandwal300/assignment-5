import { db } from "./db";

export const saveDataToDB = async (data) => {
      try {
        await db.table("amdCollections").put(data, "amdCollections");
      } catch (e) {
        console.log({ e });
      }
};
