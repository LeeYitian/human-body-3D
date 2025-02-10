import { useEffect, useMemo, useState } from "react";
import { setSize } from "@/utils/windowSize";
import { MODE, PATH } from "@/constants/constants";
import Title from "@/views/Title/Title";
import { usePath } from "@/contexts/pathContext";
import Main from "@/views/Main/Main";

const App = () => {
  const { path } = usePath();

  useEffect(() => {
    setSize();
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  const views = useMemo(() => {
    switch (path) {
      case PATH.Title:
        return <Title />;
      case PATH.Instruction:
        return <div style={{ color: "black", fontSize: "20px" }}>操作說明</div>;
      case PATH.Organ:
        return <Main />;
      case PATH.System:
        return <Main />;
    }
  }, [path]);

  return (
    <div
      id="mainContainer"
      style={{ overflow: "hidden", position: "relative" }}
    >
      {views}
    </div>
  );
};

export default App;
