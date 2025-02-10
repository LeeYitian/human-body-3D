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
