import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import VConsole from "vconsole";

const vConsole = new VConsole();
console.log("VConsole initialized:", vConsole);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
