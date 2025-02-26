import { useCallback, useEffect, useState } from "react";
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

let originalDistance = null;

const ZoomPanel = ({ position }) => {
  const [input, setInput] = useState(1);
  const [flip, setFlip] = useState(false);
  const { mode } = useMode();
  const {
    state: { camera, object, controls },
  } = useThreejs();

  const clickZoom = (value, zoomType, input) => {
    let newFOV = value;
    if (value >= 35 && zoomType === "zoomIn") {
      newFOV = input ? Math.floor(value - input) : value - 10;
      newFOV = newFOV < 35 ? 35 : newFOV;
    } else if (value < 75 && zoomType === "zoomOut") {
      newFOV = input ? Math.floor(value + input) : value + 10;
      newFOV = newFOV > 75 ? 75 : newFOV;
    }
    return newFOV;
  };

  const wheelZoom3D = useCallback(
    (e) => {
      if (!camera) return;
      if (e.deltaY > 0) {
        camera.fov = clickZoom(camera.fov, "zoomOut", 1.7);
        setInput(25 - (((camera.fov - 35) * 24) / 40 + 1));
        camera.updateProjectionMatrix();
      } else if (e.deltaY < 0) {
        camera.fov = clickZoom(camera.fov, "zoomIn", 1.7);
        setInput(25 - (((camera.fov - 35) * 24) / 40 + 1));
        camera.updateProjectionMatrix();
      }
    },
    [camera, clickZoom]
  );

  const wheelZoom = (e) => {
    if (e.deltaY > 0) {
      sendZoomIn(0.11);
      setInput(input + 4);
    } else if (e.deltaY < 0) {
      sendZoomOut(0.11);
      setInput(input - 4);
    }
  };

  useEffect(() => {
    if (!camera && mode !== MODE["3D"]) return;
    const canvas = document.getElementById("threejsCanvas");
    canvas.addEventListener("wheel", wheelZoom3D);
  }, [camera, mode]);

  useEffect(() => {
    if (mode !== MODE["2D"]) return;
    const canvas = document.getElementById("canvas2D");
    canvas.addEventListener("wheel", wheelZoom);
  }, [mode]);

  useEffect(() => {
    setInput(1);
  }, [mode]);

  return (
    <StyledContainer $position={position}>
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
              setInput(Math.max(1, input - 5));
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
              console.log("value", value);

              if (delta > 0) {
                if (mode === MODE["2D"]) {
                  sendZoomIn(0.11);
                } else {
                  camera.fov = clickZoom(camera.fov, "zoomIn", 40 / 24);
                  camera.updateProjectionMatrix();
                }
              } else if (delta < 0) {
                if (mode === MODE["2D"]) {
                  sendZoomOut(0.11);
                } else {
                  camera.fov = clickZoom(camera.fov, "zoomOut", 40 / 24);
                  camera.updateProjectionMatrix();
                }
              }
              setInput(parseInt(value));
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
              setInput(Math.min(25, input + 5));
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
            // const direction = new THREE.Vector3();
            // camera.getWorldDirection(direction); // 取得相機當前的觀看方向
            // direction.normalize().multiplyScalar(-10); // 讓方向反向，並乘上一個合適的距離 (5 可調整)
            // console.log("direction", direction);

            // 設定新相機位置
            camera.position.set(
              camera.position.x,
              camera.position.y,
              camera.position.z * -1
            );

            // 讓相機看向目標
            camera.lookAt(object.position);

            // 讓相機到達模型背後
            // camera.position.set(
            //   camera.position.x,
            //   camera.position.y,
            //   camera.position.z * -1
            // );
            // // 讓相機看向模型
            // camera.lookAt(object.position);

            // // 取得人體的世界方向 (正面方向)
            // const forwardDirection = new THREE.Vector3();
            // object.getWorldDirection(forwardDirection);

            // // 計算「背面」的位置 (正面的反方向)
            // const backPosition = new THREE.Vector3()
            //   .copy(object.position)
            //   .add(forwardDirection.negate().multiplyScalar(5));

            // // 設定相機位置到背面
            // camera.position.copy(backPosition);

            // // 讓相機看向人體
            // camera.lookAt(object.position);
          }
        }}
      />
    </StyledContainer>
  );
};

export default ZoomPanel;
