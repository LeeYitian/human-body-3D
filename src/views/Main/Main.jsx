import SideBar from "@/components/SideBar/SideBar";
import { StyledBG } from "./Main.style";
import ZoomPanel from "@/components/ZoomPanel/ZoomPanel";
import Menu from "@/components/Menu/Menu";
import SystemInfoPanel from "@/components/SystemInfoPanel/SystemInfoPanel";
import { usePath } from "@/contexts/pathContext";
import { PATH, MODE } from "@/constants/constants";
import ThreeJSCanvas from "@/components/threejsContainer/threejsContainer";
import { useMode } from "@/contexts/modeContext";

const Main = () => {
  const { mode, switchMode } = useMode();
  const { path } = usePath();

  const handleMode = () => {
    switchMode(mode === MODE["2D"] ? MODE["3D"] : MODE["2D"]);
  };

  return (
    <StyledBG $imgSrc="./assets/mainBG.png">
      <SideBar />
      <ZoomPanel />
      <Menu setMode={handleMode} />
      {path === PATH.System && <SystemInfoPanel />}
      <iframe
        id="canvas2D"
        src="./flash.html"
        style={{ display: mode === MODE["2D"] ? "block" : "none" }}
      />
      <ThreeJSCanvas mode={mode} />
    </StyledBG>
  );
};

export default Main;
