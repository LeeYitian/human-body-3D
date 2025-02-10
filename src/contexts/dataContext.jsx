import { createContext, useContext, useEffect, useState } from "react";
import { usePath } from "./pathContext";
import { PATH } from "@/constants/constants";

const dataContext = createContext(null);

export const useData = () => useContext(dataContext);

export const DataProvider = ({ children }) => {
  const { path } = usePath();
  const [data, setData] = useState();
  useEffect(() => {
    if (path === PATH.Title) return;
    fetch("./data/data.json")
      .then((res) => res.json())
      .then((data) => setData(data[path]))
      .catch((err) => console.log("fetch modal data error", err));
  }, [path]);

  return (
    <dataContext.Provider value={{ data }}>{children}</dataContext.Provider>
  );
};
