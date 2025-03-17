let bodyModel;
let game;
let path;
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
let gameContent;
let targetedOrgan;
let hideOrgans = [];
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
  game.gotoAndStop(0);

  parent.postMessage({ type: "getPath" });
}

function zoomContentInit() {
  console.log("zoomContentInit", game);
  zoomContent = game.children.find(
    (child) => child.name && child.name.includes("zoomContent")
  );
  bodyModel = zoomContent.getChildByName("bodyModel");
  // zoomContent = game.getChildByName("zoomContent");
  // bodyModel = zoomContent.getChildByName("bodyModel");
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

  zoomContent.scaleX = zoomContent.scaleY = scale;
  // zoomContent.y -= 100;

  zoomContent.addEventListener("mousedown", areaDragDown);
  zoomContent.addEventListener("mousewheel", (e) => console.log("e", e));
  console.log("zoomContent", zoomContent);

  // console.log("bodyModel", bodyModel);
}

function bodyModelInit() {
  console.log("bodyModelInit", bodyModel);
  bodyModel.children.forEach((child) => {
    child.visible = true;
    if (child.totalFrames > 0) {
      child.gotoAndStop(0);
    }
    if (child.name && child.name.includes(targetedOrgan)) {
      child.gotoAndStop(1);
    }
    if (
      (child.name && child.name.includes("lung")) ||
      (child.name && child.name.includes("mouth") && path === "Organ")
    ) {
      child.visible = false;
    }

    hideOrgans.forEach((organ) => {
      const organName = organ.split("_")[0];
      if (child.name && child.name.includes(organName)) {
        child.visible = false;
      }
    });
  });

  if (bodyModel.isGaming) {
    bodyModel.children.forEach((child) => {
      if (child.name) {
        const name = child.name.split("_")[0];
        if (checkedPuzzles.includes(name)) {
          child.alpha = 1;
        } else if (organs.includes(name)) {
          child.alpha = 0.01;
        }
        if (name === "mouth" || name === "esophagus" || name === "anus") {
          child.visible = false;
        }
      }
    });
    const bodyFrame = bodyModel.getChildByName("body");
    bodyFrame.mouseEnable = false;
  }
}

function loadGameAndInit(gameName) {
  console.log("loadGameAndInit", gameName);
  gameContent = new _lib[gameName]();
  game.removeChild(zoomContent);

  zoomContent = gameContent.getChildByName("zoomContent");
  zoomBaseSize = {
    w: zoomContent.nominalBounds.width,
    h: zoomContent.nominalBounds.height,
  };
  zoomContentXY = {
    x: zoomContent.x,
    y: zoomContent.y,
  };
  zoomContent.addEventListener("mousedown", areaDragDown);
  game.addChild(gameContent);

  switch (gameName) {
    case "abdominal_puzzle":
      abdominalPuzzleInit();
      break;
  }
}
