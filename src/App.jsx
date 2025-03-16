import { useCallback, useEffect, useMemo } from "react";
import { setSize } from "@/utils/windowSize";
import { PATH } from "@/constants/constants";
import Title from "@/views/Title/Title";
import { usePath } from "@/contexts/pathContext";
import Main from "@/views/Main/Main";
import OrganGame from "@/views/OrganGame/OrganGame";

const App = () => {
  const { path, goto } = usePath();

  useEffect(() => {
    setSize();
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  const handleMessage = useCallback(
    (e) => {
      console.log(`[iframe -> main]:`, e.data);
      if (e.data.type === "getPath") {
        e.source.postMessage({ type: "getPath", value: path });
      }
    },
    [path]
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [handleMessage]);

  const views = useMemo(() => {
    switch (path) {
      case PATH.Title:
        return <Title />;
      // case PATH.Instruction:
      //   return (
      //     <div style={{ color: "black", fontSize: "20px" }}>
      //       操作說明<button onClick={() => goto(PATH.Title)}>回首頁</button>
      //     </div>
      //   );
      case PATH.Organ:
        return <Main />;
      case PATH.System:
        return <Main />;
      case PATH.OrganGame:
        return <OrganGame />;
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
