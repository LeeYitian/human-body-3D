import { useEffect, useRef } from "react";
import * as THREE from "three";
import { TIFFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { MODE } from "@/constants/constants";
import { useThreejs } from "@/contexts/threejsContext";

const ThreeJSCanvas = ({ mode, threejsRef }) => {
  const { dispatch } = useThreejs();

  useEffect(() => {
    if (mode !== MODE["3D"] || threejsRef.current) return;
    const mainContainer = document.getElementById("mainContainer");

    const scene = new THREE.Scene();
    threejsRef.current = scene;
    const camera = new THREE.PerspectiveCamera(
      75,
      mainContainer.clientWidth / mainContainer.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);

    dispatch({ type: "setCamera", payload: camera });

    const canvas = document.querySelector("#threejsCanvas");

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(mainContainer.clientWidth, mainContainer.clientHeight);
    mainContainer.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    dispatch({ type: "setControls", payload: controls });

    // 1. 環境光，確保所有地方都有基本照明
    const ambientLight = new THREE.AmbientLight(0xffffff, 5);
    scene.add(ambientLight);

    // 2. 方向光，提供主要光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // 3. 半球光，增加上方 & 底部的光
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x666666, 5);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    // 4. 兩個對角的點光源，補充陰影區域
    const pointLight1 = new THREE.PointLight(0xffffff, 5, 50);
    pointLight1.position.set(-10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 5, 50);
    pointLight2.position.set(10, -10, -10);
    scene.add(pointLight2);

    const manager = new THREE.LoadingManager();
    manager.addHandler(/\.tif$/i, new TIFFLoader());
    const fbxLoader = new FBXLoader(manager);
    fbxLoader.load(
      "./models/export/test_all.FBX",
      (object) => {
        // object.scale.set(0.8, 0.8, 0.8)

        object.traverse((child) => {
          // console.log("child", child.name);
          if (child.name.includes("Lung")) {
            child.visible = false;
          }
        });
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());

        object.position.sub(center); // 讓模型居中

        camera.fov = 35;

        camera.position.z = size / 1.5; // 根據模型大小調整相機距離
        dispatch({ type: "setObjects", payload: object.children });
        dispatch({ type: "setObject", payload: object });
        scene.add(object);
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

    function animate() {
      controls.update();
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
    const setSize = () => {
      camera.aspect = mainContainer.clientWidth / mainContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mainContainer.clientWidth, mainContainer.clientHeight);
    };

    window.addEventListener("resize", setSize);

    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, [mode]);

  return (
    <canvas
      id="threejsCanvas"
      style={{
        position: "absolute",
        top: "0",
        display: mode === MODE["3D"] ? "block" : "none",
        zIndex: "1",
      }}
    ></canvas>
  );
};

export default ThreeJSCanvas;
