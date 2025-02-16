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
      const object = bodyModel.getChildByName(e.data.value);
      if (object) {
        object.visible = !object.visible;
      } else {
        alert(`找不到${e.data.value}`);
      }
      break;
    }
    case "showAllObjects": {
      const objects = e.data.value;
      objects.forEach((object) => {
        const obj = bodyModel.getChildByName(object);
        if (obj) {
          obj.visible = true;
        }
      });
      break;
    }
    case "hideAllObjects": {
      const objects = e.data.value;
      objects.forEach((object) => {
        const obj = bodyModel.getChildByName(object);
        if (obj) {
          obj.visible = false;
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
    case "loadGame": {
      loadGameAndInit(e.data.value);
    }
  }
});
