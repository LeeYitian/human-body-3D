function setZoom(type, value) {
  console.log("type", type, "value", value);

  // const currentZoomStep = zoomStep.findIndex((step) => step === scale);

  let offsetX;
  let offsetY;

  switch (type) {
    case "zoomIn":
      if (value) {
        scale = Math.min(4, scale + value);
      } else {
        console.log("else", scale, scale + 0.5);
        scale = Math.min(4, scale + 0.5);
      }
      // if (currentZoomStep === zoomStep.length - 1) return;
      // offsetX = originalX - zoomBaseSize.w / 4;
      // offsetY = originalY - zoomBaseSize.h / 4;

      break;
    case "zoomOut":
      if (value) {
        scale = Math.max(1.5, scale - value);
      } else {
        scale = Math.max(1.5, scale - 0.5);
      }
      // if (currentZoomStep === 0) return;
      // offsetX = originalX + zoomBaseSize.w / 4;
      // offsetY = originalY + zoomBaseSize.h / 4;
      break;
    default:
      scale = 1.5;
  }
  zoomContent.scaleX = zoomContent.scaleY = scale;
  console.log("scale", scale);
  if (scale === 1.5) {
    // 如果縮放回原始大小，位置也要調回原始位置
    zoomContent.x = zoomContentXY.x;
    zoomContent.y = zoomContentXY.y;
  } else {
    // zoomContent.x -= (scale * zoomBaseSize.w - zoomBaseSize.w) / scale;
    // zoomContent.y -= (scale * zoomBaseSize.h - zoomBaseSize.h) / scale;
  }

  stage.update();
}

function areaDragDown(e) {
  // var point = { x: e.stageX, y: e.stageY };
  var point = zoomContent.globalToLocal(e.stageX, e.stageY);

  // if (zoomContent.scaleX === 1.5 || zoomContent.scaleX === -1.5) return;
  zoomContent.dX = point.x - zoomContent.x;
  zoomContent.dY = point.y - zoomContent.y;
  zoomContent.baseX = point.x;
  zoomContent.baseY = point.y;

  zoomContent.addEventListener("pressmove", areaDragMove);
  zoomContent.addEventListener("pressup", areaDragUp);
  stage.update();
}

function areaDragMove(e) {
  // var point = stage.globalToLocal(e.stageX, e.stageY);
  // var point = { x: e.stageX, y: e.stageY };
  var point = zoomContent.globalToLocal(e.stageX, e.stageY);

  zoomContent.x = point.x - zoomContent.dX;
  zoomContent.y = point.y - zoomContent.dY;

  // console.log("======")
  // console.log(`point.x ${point.x}, point.y ${point.y}`)
  // console.log(`zoomContent.x ${zoomContent.x}, zoomContent.y ${zoomContent.y}`)
  // console.log(`zoomContent.dX ${zoomContent.dX}, zoomContent.dY ${zoomContent.dY}`)
  // console.log("======")

  // if (zoomContent.x > 0) {
  //   zoomContent.x = 0;
  // }
  // if (zoomContent.y > 0) {
  //   zoomContent.y = 0;
  // }
  if (
    zoomContent.x + zoomContent.nominalBounds.width * zoomContent.scaleX <
    zoomContent.nominalBounds.width
  ) {
    zoomContent.x = -zoomContent.nominalBounds.width * (zoomContent.scaleX - 1);
  }
  if (
    zoomContent.y + zoomContent.nominalBounds.height * zoomContent.scaleY <
    zoomContent.nominalBounds.height
  ) {
    zoomContent.y =
      -zoomContent.nominalBounds.height * (zoomContent.scaleY - 1);
  }
}
function areaDragUp(e) {
  zoomContent.removeEventListener("pressmove", areaDragMove);
  zoomContent.removeEventListener("pressup", areaDragUp);
}
