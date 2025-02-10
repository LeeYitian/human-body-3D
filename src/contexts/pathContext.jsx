import { createContext, useContext, useReducer } from "react";
import { PATH } from "@/constants/constants";

const pathContext = createContext(PATH.Title);

export const usePath = () => useContext(pathContext);
const pathReducer = (state, action) => {
  state = action;
  return state;
};
export const PathProvider = ({ children }) => {
  const [path, goto] = useReducer(pathReducer, PATH.Title);

  return (
    <pathContext.Provider value={{ path, goto }}>
      {children}
    </pathContext.Provider>
  );
};
