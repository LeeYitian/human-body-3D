import { usePath } from "@/contexts/pathContext";
import { useThreejs } from "@/contexts/threejsContext";
import { useMode } from "@/contexts/modeContext";
import {
  StyledBG,
  StyledBottom,
  StyledBottomAction,
  StyledBtn,
  StyledContent,
  StyledContentShow,
  StyledOption,
  StyledOrganPanel,
  StyledPanelContent,
  StyledPanelHeader,
  StyledPanelOption,
  StyledSideArrow,
  StyledSwitch,
  StyledSystemPanel,
  StyledTitle,
} from "./SideBar.style";
import { PATH, MODE } from "@/constants/constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import CheckBox from "@/components/CheckBox/CheckBox";
import { sendShowObject } from "@/utils/message";
import IntroModal from "@/components/IntroModal/IntroModal";

const titleBG = {
  [PATH.Organ]: "./assets/title_organ.png",
  [PATH.System]: "./assets/title_system.png",
};
const ORGAN = {
  肝臟: "liver",
  胰臟: "pancreas",
  膽囊: "gallbladder",
  腎臟: "kidney",
  脾臟: "spleen",
  胃: "stomach",
  大腸: "largeIntestine",
  小腸: "smallIntestine",
  盲腸: "cecum",
};

const SYSTEM = {
  消化系統: "消化系統",
  // 循環系統: "循環系統",
  // 呼吸系統: "呼吸系統",
};
const SideBar = () => {
  const { path, goto } = usePath();
  const { mode } = useMode();
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [openPanel, setOpenPanel] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [organs, setOrgans] = useState({
    liver: true,
    pancreas: true,
    gallbladder: true,
    kidney: true,
    spleen: true,
    stomach: true,
    largeIntestine: true,
    smallIntestine: true,
    cecum: true,
    diaphragm: true,
    body: true,
  });
  const {
    state: { objects },
  } = useThreejs();

  const handleCheckBox = (organ) => {
    setOrgans({
      ...organs,
      [organ]: !organs[organ],
    });
    if (mode === MODE["3D"]) {
      const tempObj = objects[organ];
      if (tempObj) {
        tempObj.visible = !tempObj.visible;
      } else {
        alert("找不到" + organ);
      }
    } else {
      sendShowObject(organ);
    }
  };

  const selecAll = () => {
    let temp = {};
    Object.keys(organs).forEach((organ) => {
      temp[organ] = !organs[organ];
    });
    setOrgans(temp);
    if (mode === MODE["3D"]) {
      Object.keys(objects).forEach((key) => {
        if (!Object.keys(organs).includes(key)) return;
        objects[key].visible = !objects[key].visible;
      });
    } else {
      Object.keys(organs).forEach((organ) => {
        sendShowObject(organ);
      });
    }
  };

  useEffect(() => {
    if (!objects) return;
    if (mode === MODE["3D"]) {
      Object.keys(objects).forEach((key) => {
        objects[key].visible = organs[key];
      });
    } else {
      Object.keys(organs).forEach((organ) => {
        if (!organs[organ]) {
          sendShowObject(organ);
        }
      });
    }
  }, [mode, objects]);

  return (
    <>
      <StyledBG $imgSrc="./assets/sideBarBG.png" $open={sideBarOpen}>
        <StyledTitle $imgSrc={titleBG[path]} />
        {path === PATH.Organ && (
          <StyledContent>
            <StyledOrganPanel>
              <StyledPanelHeader $open={openPanel}>
                <div>
                  <CheckBox
                    checked={Object.values(organs).every((v) => v)}
                    updateState={() => selecAll()}
                  />
                  <span>腹腔</span>
                </div>
                <Icon
                  icon={
                    openPanel
                      ? "icon-park-solid:down-one"
                      : "icon-park-solid:up-one"
                  }
                  color="white"
                  onClick={() => setOpenPanel(!openPanel)}
                />
              </StyledPanelHeader>
              <StyledPanelContent $open={openPanel}>
                {Object.keys(ORGAN).map((key) => (
                  <StyledPanelOption key={key}>
                    <CheckBox
                      checked={organs[ORGAN[key]]}
                      updateState={() => handleCheckBox(ORGAN[key])}
                    />
                    <span onClick={() => setShowModal(true)}>{key}</span>
                  </StyledPanelOption>
                ))}
              </StyledPanelContent>
            </StyledOrganPanel>
          </StyledContent>
        )}
        {path === PATH.System && (
          <StyledContent>
            {Object.keys(SYSTEM).map((key) => (
              <StyledSystemPanel key={key}>{key}</StyledSystemPanel>
            ))}
          </StyledContent>
        )}
        <StyledBottom $path={path}>
          {path === PATH.Organ && (
            <StyledContentShow>
              <StyledOption>
                <CheckBox
                  checked={organs.diaphragm}
                  updateState={() => handleCheckBox("diaphragm")}
                />
                橫膈膜
              </StyledOption>
              <StyledOption>
                <CheckBox
                  checked={organs.body}
                  updateState={() => handleCheckBox("body")}
                />
                人體輪廓
              </StyledOption>
            </StyledContentShow>
          )}
          <StyledBottomAction>
            <StyledBtn
              $imgSrc="./assets/backToMainBtn.png"
              onClick={() => goto(PATH.Title)}
            />
            <StyledBtn
              $imgSrc="./assets/instructionBtn.png"
              onClick={() => goto(PATH.Instruction)}
            />
          </StyledBottomAction>
        </StyledBottom>
        <StyledSwitch onClick={() => setSideBarOpen(!sideBarOpen)}>
          <Icon
            icon={
              sideBarOpen
                ? "icon-park-solid:left-one"
                : "icon-park-solid:right-one"
            }
            style={{ height: "100%", width: "100%", color: "white" }}
          />
        </StyledSwitch>
      </StyledBG>
      {showModal && (
        <StyledSideArrow>
          <Icon icon="ri:arrow-left-wide-fill" />
        </StyledSideArrow>
      )}
      {showModal && (
        <StyledSideArrow style={{ left: "92%" }}>
          <Icon icon="ri:arrow-right-wide-fill" />
        </StyledSideArrow>
      )}
      {showModal && <IntroModal setShowModal={setShowModal} />}
    </>
  );
};

export default SideBar;
