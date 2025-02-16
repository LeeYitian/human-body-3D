window.addEventListener("message", (e) => {
  console.log(`[iframe -> main]:`, e.data);
});

export const sendZoomIn = (input) => {
  const iframeWindow = document.querySelector("iframe").contentWindow;
  iframeWindow.postMessage({
    type: "zoomIn",
    value: input,
  });
};

export const sendZoomOut = (input) => {
  const iframeWindow = document.querySelector("iframe").contentWindow;
  iframeWindow.postMessage({
    type: "zoomOut",
    value: input,
  });
};

export const sendFlip = () => {
  const iframeWindow = document.querySelector("iframe").contentWindow;
  iframeWindow.postMessage({
    type: "flip",
  });
};

export const sendShowObject = (objectName) => {
  const iframeWindow = document.querySelector("iframe").contentWindow;
  iframeWindow.postMessage({
    type: "showObject",
    value: objectName,
  });
};

export const sendShowAllObjects = (objects) => {
  const iframeWindow = document.querySelector("iframe").contentWindow;
  iframeWindow.postMessage({
    type: "showAllObjects",
    value: objects,
  });
};

export const sendHideAllObjects = (objects) => {
  const iframeWindow = document.querySelector("iframe").contentWindow;
  iframeWindow.postMessage({
    type: "hideAllObjects",
    value: objects,
  });
};

export const sendTargetOrgan = (organName) => {
  const iframeWindow = document.querySelector("iframe").contentWindow;
  iframeWindow.postMessage({
    type: "targetOrgan",
    value: organName,
  });
};

export const sendLoadGame = (gameName) => {
  const iframeWindow = document.querySelector("iframe").contentWindow;
  iframeWindow.postMessage({
    type: "loadGame",
    value: gameName,
  });
};

export const sendUntargetOrgan = () => {
  const iframeWindow = document.querySelector("iframe").contentWindow;
  iframeWindow.postMessage({
    type: "untargetOrgan",
  });
};
