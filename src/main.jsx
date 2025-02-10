import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PathProvider } from "@/contexts/pathContext";
import { ThreeJSProvider } from "@/contexts/threejsContext.jsx";
import { ModeProvider } from "@/contexts/modeContext.jsx";
import { DataProvider } from "@/contexts/dataContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PathProvider>
      <DataProvider>
        <ModeProvider>
          <ThreeJSProvider>
            <App />
          </ThreeJSProvider>
        </ModeProvider>
      </DataProvider>
    </PathProvider>
  </StrictMode>
);
