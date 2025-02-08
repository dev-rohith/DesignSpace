import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            error: {
              duration: 4000,
              theme: {
                primary: "red",
                secondary: "black",
              },
            },
            success: {
              duration: 2000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
