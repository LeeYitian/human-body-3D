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
  },
};
const SystemInfoPanel = () => {
  const [openPanel, setOpenPanel] = useState(true);
  const [showModal, setShowModal] = useState(false);
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
    liver: true,
    pancreas: true,
    intestinalGland: true,
  });

  const handleCheckBox = (system, organ) => {
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

  const selecAll = (system) => {
    if (system === "消化道") {
      let temp = {};
      Object.keys(tractOrgans).forEach((organ) => {
        temp[organ] = !tractOrgans[organ];
      });
      setTractOrgans(temp);

      if (mode === MODE["3D"]) {
        Object.keys(objects).forEach((key) => {
          if (!Object.keys(tractOrgans).includes(key)) return;
          objects[key].visible = !objects[key].visible;
        });
      } else {
        Object.keys(tractOrgans).forEach((organ) => {
          sendShowObject(organ);
        });
      }
    } else {
      let temp = {};
      Object.keys(glandOrgans).forEach((organ) => {
        temp[organ] = !glandOrgans[organ];
      });
      setTractOrgans(temp);

      if (mode === MODE["3D"]) {
        Object.keys(objects).forEach((key) => {
          if (!Object.keys(glandOrgans).includes(key)) return;
          objects[key].visible = !objects[key].visible;
        });
      } else {
        Object.keys(glandOrgans).forEach((organ) => {
          sendShowObject(organ);
        });
      }
    }
  };

  useEffect(() => {
    if (!objects) return;
    if (mode === MODE["3D"]) {
      Object.keys(objects).forEach((key) => {
        objects[key].visible = tractOrgans[key] ?? glandOrgans[key];
      });
    } else {
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
  }, [mode, objects]);

  return (
    <>
      <StyledMainBtn
        $open={openPanel}
        $imgSrc="./assets/informationBtn.png"
        onClick={() => setOpenPanel(!openPanel)}
      />
      <StyledInfoPanel $open={openPanel}>
        <StyledMainBtn
          $imgSrc="./assets/informationBtn.png"
          onClick={() => setOpenPanel(!openPanel)}
        />
        {Object.keys(INFO).map((system) => {
          const temp = system === "消化道" ? tractOrgans : glandOrgans;
          return (
            <StyledPanelColumn>
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
                  <StyledOrganOption>
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
      {showModal && <IntroModal setShowModal={setShowModal} data={modalData} />}
    </>
  );
};

export default SystemInfoPanel;
