import { useEffect, useState } from "react";
import {
  StyledInfoPanel,
  StyledMainBtn,
  StyledOrganOption,
  StyledPanelColumn,
  StyledSystemOption,
} from "./SystemInfoPanel.style";
import CheckBox from "@/components/CheckBox/CheckBox";
import { useMode } from "@/contexts/modeContext";
import { useThreejs } from "@/contexts/threejsContext";
import { MODE } from "@/constants/constants";
import { sendShowObject } from "@/utils/message";
import IntroModal from "@/components/IntroModal/IntroModal";
import { useData } from "@/contexts/dataContext";
import {
  sendTargetOrgan,
  sendHideAllObjects,
  sendShowAllObjects,
} from "@/utils/message";
import Draggable from "react-draggable";

const INFO = {
  消化道: {
    口腔: "mouth",
    咽: "pharynx",
    食道: "esophagus",
    胃: "stomach",
    大腸: "largeIntestine",
    小腸: "smallIntestine",
    肛門: "anus",
  },
  消化腺: {
    唾腺: "salivaryGland",
    胃腺: "gastricGland",
    肝臟: "liver",
    胰臟: "pancreas",
    腸腺: "intestinalGland",
    膽囊: "gallbladder",
  },
};
const SystemInfoPanel = () => {
  const [openPanel, setOpenPanel] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const { data } = useData();
  const [modalData, setModalData] = useState();
  const { mode } = useMode();
  const {
    state: { objects },
  } = useThreejs();
  const [tractOrgans, setTractOrgans] = useState({
    mouth: true,
    pharynx: true,
    esophagus: true,
    stomach: true,
    largeIntestine: true,
    smallIntestine: true,
    anus: true,
  });
  const [glandOrgans, setGlandOrgans] = useState({
    salivaryGland: true,
    gastricGland: true,
    gallbladder: true,
    liver: true,
    pancreas: true,
    intestinalGland: true,
  });

  const handleCheckBox = (system, organ) => {
    if (mode === MODE["3D"]) {
      let tempObj = objects[organ];
      if (organ === "largeIntestine") {
        tempObj = [...objects[organ], ...objects["cecum"]];
      }

      if (organ === "stomach" && !glandOrgans.gastricGland) {
        tempObj = [...tempObj, ...objects["alphaStomach"]];
      } else if (organ === "largeIntestine" && !glandOrgans.intestinalGland) {
        tempObj = [...tempObj, ...objects["alphaLargeIntestine"]];
      } else if (organ === "gastricGland") {
        if (!tractOrgans.stomach) {
          tempObj = [...tempObj, ...objects["alphaStomach"]];
        }
      } else if (organ === "intestinalGland") {
        if (!tractOrgans.largeIntestine) {
          tempObj = [...tempObj, ...objects["alphaLargeIntestine"]];
        }
      }

      // if (organ === "stomach") {
      //   const gland = objects["gastricGland"];
      //   if (gland.length && glandOrgans.gastricGland) {
      //     gland.forEach((g) => {
      //       g.visible = !g.visible;
      //     });
      //   }
      // } else if (organ === "largeIntestine") {
      //   const gland = objects["intestinalGland"];
      //   if (gland && glandOrgans.intestinalGland) {
      //     gland.forEach((g) => {
      //       g.visible = !g.visible;
      //     });
      //   }
      // } else if (organ === "gastricGland") {
      //   if (tractOrgans.stomach) {
      //     tempObj = [...objects["stomach"], ...objects["alphaStomach"]];
      //   } else {
      //     tempObj = [...objects["alphaStomach"], ...tempObj];
      //   }
      // } else if (organ === "intestinalGland") {
      //   if (tractOrgans.largeIntestine) {
      //     tempObj = [
      //       ...objects["largeIntestine"],
      //       ...objects["alphaLargeIntestine"],
      //     ];
      //   } else {
      //     tempObj = [...objects["alphaLargeIntestine"], ...tempObj];
      //   }
      // }

      if (tempObj && tempObj.length) {
        tempObj.forEach((obj) => (obj.visible = !obj.visible));
      } else if (tempObj === undefined || tempObj.length === 0) {
        alert("找不到" + organ);
        return;
      }
    } else {
      sendShowObject(organ);
    }

    if (system === "消化道") {
      setTractOrgans({
        ...tractOrgans,
        [organ]: !tractOrgans[organ],
      });
    } else {
      setGlandOrgans({
        ...glandOrgans,
        [organ]: !glandOrgans[organ],
      });
    }
  };

  const selecAll = (system) => {
    const organs = system === "消化道" ? tractOrgans : glandOrgans;
    const shouldSelectAll = Object.values(organs).some(
      (item) => item === false
    );

    if (mode === MODE["3D"]) {
      Object.keys(objects)
        .filter((key) => Object.keys(organs).includes(key) || key === "cecum")
        .forEach((key) => {
          objects[key].forEach((i) => (i.visible = shouldSelectAll));
        });
    } else {
      const organKeys = Object.keys(organs);
      shouldSelectAll
        ? sendShowAllObjects(organKeys)
        : sendHideAllObjects(organKeys);
    }

    const temp = {};
    Object.keys(organs).forEach((organ) => {
      temp[organ] = shouldSelectAll;
    });

    system === "消化道" ? setTractOrgans(temp) : setGlandOrgans(temp);
  };

  useEffect(() => {
    if (!objects) return;
    if (mode === MODE["3D"]) {
      Object.keys(objects).forEach((key) => {
        if (!Object.keys(tractOrgans).includes(key)) return;
        if (!Object.keys(glandOrgans).includes(key)) return;
        objects[key].forEach(
          (i) => (i.visible = tractOrgans[key] ?? glandOrgans[key])
        );
      });
    } else {
      sendShowAllObjects([
        ...Object.keys(tractOrgans),
        ...Object.keys(glandOrgans),
      ]);
      Object.keys(tractOrgans).forEach((organ) => {
        if (!tractOrgans[organ]) {
          sendShowObject(organ);
        }
      });
      Object.keys(glandOrgans).forEach((organ) => {
        if (!glandOrgans[organ]) {
          sendShowObject(organ);
        }
      });
    }
  }, [mode, objects, tractOrgans, glandOrgans]);

  return (
    <>
      <Draggable
        position={{ x: panelPosition.x, y: panelPosition.y }}
        onStart={() => setIsDragging(false)}
        onDrag={() => setIsDragging(true)}
        onStop={(_, data) => {
          setPanelPosition({ x: data.x, y: data.y });
        }}
      >
        <StyledMainBtn
          $open={openPanel}
          $imgSrc="./assets/informationBtn.png"
          onClick={() => {
            if (isDragging) return;
            setOpenPanel(!openPanel);
          }}
        />
      </Draggable>
      <Draggable
        position={panelPosition}
        onStop={(_, data) => {
          setPanelPosition({
            x: data.x,
            y: data.y,
          });
        }}
      >
        <StyledInfoPanel $open={openPanel}>
          <StyledMainBtn
            $imgSrc="./assets/informationBtn.png"
            onClick={() => setOpenPanel(!openPanel)}
          />
          {Object.keys(INFO).map((system) => {
            const temp = system === "消化道" ? tractOrgans : glandOrgans;
            return (
              <StyledPanelColumn key={system}>
                <StyledSystemOption>
                  <CheckBox
                    checked={Object.values(temp).every((v) => v)}
                    updateState={() => selecAll(system)}
                  />
                  <span>{system}</span>
                </StyledSystemOption>
                {Object.keys(INFO[system]).map((organ) => {
                  const checked =
                    system === "消化道"
                      ? tractOrgans[INFO[system][organ]]
                      : glandOrgans[INFO[system][organ]];
                  return (
                    <StyledOrganOption
                      key={organ}
                      $marginTop={organ === "膽囊"}
                    >
                      <CheckBox
                        checked={checked}
                        updateState={() =>
                          handleCheckBox(system, INFO[system][organ])
                        }
                      />
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setModalData(
                            data.find((i) => i.id === INFO[system][organ])
                          );
                          if (mode === MODE["2D"]) {
                            sendTargetOrgan(INFO[system][organ]);
                          }
                        }}
                      >
                        {organ}
                      </span>
                    </StyledOrganOption>
                  );
                })}
              </StyledPanelColumn>
            );
          })}
        </StyledInfoPanel>
      </Draggable>
      {showModal && <IntroModal setShowModal={setShowModal} data={modalData} />}
    </>
  );
};

export default SystemInfoPanel;
