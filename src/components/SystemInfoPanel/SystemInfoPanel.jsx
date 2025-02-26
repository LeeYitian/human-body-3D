import { useEffect, useState } from "react";
import * as THREE from "three";
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
    膽囊: "gallbladder",
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
    state: { objects, camera, controls, object },
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
      const tempObj = objects[organ];
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
        .filter((key) => Object.keys(organs).includes(key))
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
      <StyledMainBtn
        $open={openPanel}
        $imgSrc="./assets/informationBtn.png"
        onClick={() => setOpenPanel(!openPanel)}
      />
      <Draggable>
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
                    <StyledOrganOption key={organ}>
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
                          // else {
                          //   const targetPosition = new THREE.Vector3();
                          //   objects[ORGAN[key]].getWorldPosition(targetPosition);

                          //   // controls.target.set(
                          //   //   targetPosition.x,
                          //   //   targetPosition.y,
                          //   //   targetPosition.z
                          //   // );

                          //   // 設置相機位置
                          //   camera.position.set(
                          //     targetPosition.x,
                          //     targetPosition.y,
                          //     camera.position.z
                          //   );

                          //   camera.lookAt(targetPosition);
                          // }
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
