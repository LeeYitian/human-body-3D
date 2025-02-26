window.addEventListener("message", (e) => {
  console.log(`[main -> iframe]:`, e.data.type);
  // const sourceWin = e.source;
  // sourceWin.postMessage(`get type: ${e.data.type}`);

  switch (e.data.type) {
    case "zoomIn":
      setZoom("zoomIn", e.data.value);
      break;
    case "zoomOut":
      setZoom("zoomOut", e.data.value);
      break;
    case "showObject": {
      const object = bodyModel.children.find(
        (child) => child.name && child.name.includes(e.data.value)
      );
      if (object) {
        object.visible = !object.visible;
        if (!object.visible) {
          hideOrgans.push(object.name.split("_")[0]);
        } else {
          hideOrgans = hideOrgans.filter(
            (organ) => organ !== object.name.split("_")[0]
          );
        }
      } else {
        alert(`找不到${e.data.value}`);
      }
      break;
    }
    case "showAllObjects": {
      const objects = e.data.value;
      objects.forEach((object) => {
        const obj = bodyModel.children.find(
          (child) => child.name && child.name.includes(object)
        );
        if (obj) {
          obj.visible = true;
          hideOrgans = hideOrgans.filter(
            (organ) => organ !== obj.name.split("_")[0]
          );
        }
      });
      break;
    }
    case "hideAllObjects": {
      const objects = e.data.value;
      objects.forEach((object) => {
        const obj = bodyModel.children.find(
          (child) => child.name && child.name.includes(object)
        );
        if (obj) {
          obj.visible = false;
          hideOrgans.push(obj.name.split("_")[0]);
        }
      });
      break;
    }
    case "flip":
      bodyModel.gotoAndStop(bodyModel.currentFrame === 0 ? 1 : 0);
      bodyModelInit();
      break;
    case "targetOrgan": {
      const organ = bodyModel.children.find((child) =>
        child.name.includes(e.data.value)
      );
      if (organ) {
        targetOrgan(organ);
      }
      break;
    }
    case "untargetOrgan":
      targetedOrgan = null;
      bodyModel.children.forEach((child) => {
        if (child.totalFrames > 0) {
          child.gotoAndStop(0);
        }
      });
      break;
    case "loadGame":
      loadGameAndInit(e.data.value);
      break;
    case "getPath":
      path = e.data.value;
      game.gotoAndStop(path === "Organ" ? 1 : 0);
      zoomContentInit();
    // zoomContent.gotoAndStop(path === "Organ" ? 1 : 0);
    // bodyModel = zoomContent.children.filter((child) =>
    //   child.name.includes("bodyModel")
    // )[0];
    // bodyModel.gotoAndStop(0);
  }
});
