import SideBar from "@/components/SideBar/SideBar";
import { StyledBG } from "./Main.style";
import ZoomPanel from "@/components/ZoomPanel/ZoomPanel";
import Menu from "@/components/Menu/Menu";
import SystemInfoPanel from "@/components/SystemInfoPanel/SystemInfoPanel";
import { usePath } from "@/contexts/pathContext";
import { PATH, MODE } from "@/constants/constants";
import ThreeJSCanvas from "@/components/threejsContainer/threejsContainer";
import { useMode } from "@/contexts/modeContext";
import { useEffect, useRef } from "react";

const Main = () => {
  const { mode, switchMode } = useMode();
  const { path } = usePath();
  const threejsRef = useRef(null);

  const handleMode = () => {
    switchMode(mode === MODE["2D"] ? MODE["3D"] : MODE["2D"]);
  };

  useEffect(() => {
    return () => {
      const threejsCanvas = document.getElementById("threejsCanvas");
      if (threejsCanvas && threejsRef.current) {
        threejsCanvas.remove();
        threejsRef.current = null;
      }
    };
  }, []);

  return (
    <StyledBG $imgSrc="./assets/mainBG.png">
      <SideBar />
      <ZoomPanel position={{ bottom: "1%", right: "1%" }} />
      <Menu setMode={handleMode} />
      {path === PATH.System && <SystemInfoPanel />}
      <iframe
        id="canvas2D"
        src="./flash.html"
        style={{ display: mode === MODE["2D"] ? "block" : "none" }}
      />
      <ThreeJSCanvas mode={mode} threejsRef={threejsRef} />
    </StyledBG>
  );
};

export default Main;
