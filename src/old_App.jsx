// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { useEffect } from "react";
import * as THREE from "three";
import { TIFFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

function switchDisplay() {
  const iframe = document.querySelector("iframe");
  iframe.src = "";
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 10);
  camera.lookAt(0, 0, 0);

  const canvas = document.querySelector("#threejsCanvas");

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const root = document.getElementById("root");
  root.appendChild(renderer.domElement);
  console.log("renderer", renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

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
  const fbxLoader = new FBXLoader();
  fbxLoader.load(
    "/models/export/test_all.FBX",
    (object) => {
      // object.scale.set(0.8, 0.8, 0.8);
      console.log(object);
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      object.position.sub(center); // 讓模型居中

      camera.position.z = size; // 根據模型大小調整相機距離

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
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // cube.rotation.z += 0.01;
    controls.update();
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);
}
function App() {
  // const [count, setCount] = useState(0);
  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //     <button
  //       css={`
  //         color: red;
  //       `}
  //     >
  //       Button
  //     </button>
  //   </>
  // );
  return (
    <>
      <canvas id="threejsCanvas"></canvas>

      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}
      >
        <button
          onClick={() => {
            window.addEventListener("message", (msgEvt) => {
              console.log(`[iframe-> main]： `, msgEvt.data);
            });

            const iframeWindow = document.querySelector("iframe").contentWindow;
            iframeWindow.postMessage("hello iframe. Give me a number.");
            // switchDisplay();
          }}
        >
          Click
        </button>
        <iframe
          src="./flash.html"
          style={{ width: "100%", height: "100%" }}
        ></iframe>
      </div>
    </>
  );
}

export default App;
