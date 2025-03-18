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
      let object = bodyModel.children.find(
        (child) => child.name && child.name.includes(e.data.value)
      );
      if (object) {
        if (e.data.value === "stomach") {
          const gland = bodyModel.children.find(
            (child) => child.name && child.name.includes("gastricGland")
          );
          if (gland && !gland.visible) {
            object.alpha = 0.5;
            gland.visible = true;
          } else if (gland && gland.visible) {
            object.alpha = 1;
            gland.visible = false;
          }
        } else if (e.data.value === "largeIntestine") {
          const gland = bodyModel.children.find(
            (child) => child.name && child.name.includes("intestinalGland")
          );
          if (gland && !gland.visible) {
            object.alpha = 0.5;
            gland.visible = true;
          } else if (gland && gland.visible) {
            object.alpha = 1;
            gland.visible = false;
          }
        } else if (e.data.value === "gastricGland") {
          const organ = bodyModel.children.find(
            (child) => child.name && child.name.includes("stomach")
          );
          if (organ && organ.visible) {
            organ.alpha = 1;
            organ.visible = false;
          } else if (organ && !organ.visible) {
            organ.alpha = 0.5;
            organ.visible = true;
          }
          object.visible = !object.visible;
        } else if (e.data.value === "intestinalGland") {
          const organ = bodyModel.children.find(
            (child) => child.name && child.name.includes("largeIntestine")
          );
          if (organ && organ.visible) {
            organ.alpha = 1;
            organ.visible = false;
          } else if (organ && !organ.visible) {
            organ.alpha = 0.5;
            organ.visible = true;
          }
          object.visible = !object.visible;
        } else {
          object.visible = !object.visible;
        }

        if (!object.visible || object.alpha !== 1) {
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
