import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
// import { store } from "./redux/store";
// import debounce from "debounce";
import { loadState } from "./redux/storage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./redux/store";
import { persistMiddleware } from "./redux/persistReduxMiddleware";

async function init() {
  const preloadedState = await loadState();

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware),
  });
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
}

init();
