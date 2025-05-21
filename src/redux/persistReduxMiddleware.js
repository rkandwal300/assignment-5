import { saveState } from "./storage";

export const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  saveState(store.getState());

  return result;
};
