import { useState } from "react";
import * as THREE from "three";
import {
  StyledContainer,
  StyledFlipBtn,
  StyledZoomArea,
  StyledZoomBtn,
} from "./Zoom.style";
import { sendZoomIn, sendZoomOut, sendFlip } from "@/utils/message";
import { useThreejs } from "@/contexts/threejsContext";
import { useMode } from "@/contexts/modeContext";
import { MODE } from "@/constants/constants";

const ZoomPanel = () => {
  const [input, setInput] = useState(1);
  const [flip, setFlip] = useState(false);
  const { mode } = useMode();
  const {
    state: { camera, object, controls },
  } = useThreejs();

  const clickZoom = (value, zoomType, input) => {
    if (value > 35 && zoomType === "zoomIn") {
      return input ? value - input : value - 10;
    } else if (value < 75 && zoomType === "zoomOut") {
      return input ? value + input : value + 10;
    } else {
      return value;
    }
  };

  return (
    <StyledContainer>
      <StyledZoomArea>
        <StyledZoomBtn
          $imgSrc="./assets/zoomOutBtn.png"
          onClick={() => {
            if (mode === MODE["2D"]) {
              sendZoomOut();
              setInput(input - 4);
            } else {
              camera.fov = clickZoom(camera.fov, "zoomOut");
              camera.updateProjectionMatrix();
              setInput(input - 5);
            }
          }}
        />
        <div className="range">
          <input
            type="range"
            min="1"
            max="25"
            // step={}
            value={input}
            onInput={(e) => {
              const { value } = e.target;
              const delta = value - input;

              if (delta > 0) {
                if (mode === MODE["2D"]) {
                  sendZoomIn(0.1);
                } else {
                  camera.fov = clickZoom(camera.fov, "zoomIn", 4.5);
                  camera.updateProjectionMatrix();
                }
              } else if (delta < 0) {
                if (mode === MODE["2D"]) {
                  sendZoomOut(0.1);
                } else {
                  camera.fov = clickZoom(camera.fov, "zoomOut", 4.5);
                  camera.updateProjectionMatrix();
                }
              }
              setInput(value);
            }}
          />
        </div>
        <StyledZoomBtn
          $imgSrc="./assets/zoomInBtn.png"
          onClick={() => {
            if (mode === MODE["2D"]) {
              sendZoomIn();
              setInput(input + 4);
            } else {
              camera.fov = clickZoom(camera.fov, "zoomIn");
              camera.updateProjectionMatrix();
              setInput(input + 5);
            }
          }}
        />
      </StyledZoomArea>
      <StyledFlipBtn
        $imgSrc={
          flip ? "./assets/flipBtn_right.png" : "./assets/flipBtn_wrong.png"
        }
        onClick={() => {
          setFlip(!flip);
          if (mode === MODE["2D"]) {
            sendFlip();
          } else {
            // 讓相機到達模型背後
            camera.position.set(
              camera.position.x,
              camera.position.y,
              camera.position.z * -1
            );
            // // 讓相機看向模型
            camera.lookAt(object.position);
          }
        }}
      />
    </StyledContainer>
  );
};

export default ZoomPanel;
