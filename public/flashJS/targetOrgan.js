function targetOrgan(organ) {
  targetedOrgan = organ.name.split("_")[0];
  bodyModel.children.forEach((child) => {
    if (child.totalFrames > 0) child.gotoAndStop(0);
  });
  organ.gotoAndStop(1);

  if (path === "System") return;

  const pos = organ.localToLocal(organ.x, organ.y, zoomContent);
  const center = {
    x: 1280 / 2,
    y: 720 / 2,
  };
  // if (center.x - pos.x < 0) {
  //   zoomContent.x = zoomContentXY.x - (center.x - pos.x);
  // } else {
  zoomContent.x = zoomContentXY.x + (center.x - pos.x);
  // }

  // if (center.y - pos.y > 0) {
  //   zoomContent.y = zoomContentXY.y + (center.y - pos.y);
  // } else {
  zoomContent.y = zoomContentXY.y + (center.y - pos.y);
  // }
}
