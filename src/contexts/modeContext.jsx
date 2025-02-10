import { createContext, useContext, useReducer } from "react";
import { MODE } from "@/constants/constants";

const modeContext = createContext(MODE["3D"]);

export const useMode = () => useContext(modeContext);
const modeReducer = (state, action) => {
  state = action;
  return state;
};
export const ModeProvider = ({ children }) => {
  const [mode, switchMode] = useReducer(modeReducer, MODE["2D"]);

  return (
    <modeContext.Provider value={{ mode, switchMode }}>
      {children}
    </modeContext.Provider>
  );
};
