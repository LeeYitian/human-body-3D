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
      const temp = bodyModel.getChildByName(e.data.value);
      if (temp) {
        temp.visible = !temp.visible;
      }
      break;
    }
    case "flip":
      bodyModel.gotoAndStop(bodyModel.currentFrame === 0 ? 1 : 0);
      bodyModelInit();
      break;
  }
});
