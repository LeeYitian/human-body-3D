let bodyModel;
let game;
// const zoomStep = [1, 1.5, 2, 3];
let scale = 1;
let zoomBaseSize = {
  w: 0,
  h: 0,
};
let zoomContentXY = {
  x: 0,
  y: 0,
};
let zoomContent;
function gameInit() {
  stage.enableMouseOver(20);
  createjs.Touch.enable = function (stage, singleTouch, allowDefault) {
    if (stage.__touch) {
      return true;
    }
    stage.__touch = {
      pointers: {},
      multitouch: !singleTouch,
      preventDefault: !allowDefault,
      count: 0,
    };
    createjs.Touch._IOS_enable(stage);
    return true;
  };
  createjs.Touch.enable(stage, true);

  game = exportRoot;
  zoomContent = game.getChildByName("zoomContent");
  bodyModel = zoomContent.getChildByName("bodyModel");
  bodyModel.gotoAndStop(0);
  bodyModelInit();

  zoomBaseSize = {
    w: zoomContent.nominalBounds.width,
    h: zoomContent.nominalBounds.height,
  };
  zoomContentXY = {
    x: zoomContent.x,
    y: zoomContent.y,
  };

  zoomContent.addEventListener("mousedown", areaDragDown);
  console.log("zoomContent", zoomContent);

  // console.log("bodyModel", bodyModel);
}

function bodyModelInit() {
  bodyModel.children.forEach((child) => {
    if (child.totalFrames > 0) {
      child.gotoAndStop(0);
    }
  });
}
