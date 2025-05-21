import { db } from "@/db/db";

export async function loadState() {
  try {
    const state = await db.table("redux").get("redux");
    return state || {};
  } catch (e) {
    console.log({ e });
    return undefined;
  }
}

export async function saveState(state) {
  try {
    await db.table("redux").put(state, "redux");
  } catch (e) {
    console.log({ e });
  }
}
// const KEY = "redux";
// export function loadState() {
//   try {
//     const serializedState = localStorage.getItem(KEY);
//     if (!serializedState) return undefined;
//     return JSON.parse(serializedState);
//   } catch (e) {
//     console.log({e})
//     return undefined;
//   }
// }

// export async function saveState(state) {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem(KEY, serializedState);
//   } catch (e) {
//     console.log({e})
//   }
// }
