const organs = [
  "liver",
  "pancreas",
  "gallbladder",
  "kidney",
  "spleen",
  "stomach",
  "largeIntestine",
  "smallIntestine",
  "cecum",
  "diaphragm",
];
let puzzles = [];
let dragTarget;
let offsetX;
let offsetY;
let checkedPuzzles = [];

function abdominalPuzzleInit() {
  bodyModel = zoomContent.getChildByName("bodyModel");
  bodyModel.isGaming = true;
  bodyModel.gotoAndStop(0);
  bodyModelInit();
  console.log("abdominalPuzzleInit", bodyModel);

  gameContent.children.forEach((child) => {
    if (child.name && child.name.includes("puzzle")) {
      puzzles.push(child);
      child.cursor = "pointer";
      child.addEventListener("mousedown", puzzleClick);
    }
  });
}

function puzzleClick(e) {
  dragTarget = e.currentTarget;
  const points = gameContent.globalToLocal(e.stageX, e.stageY);
  console.log("points", points);
  offsetX = points.x - dragTarget.x;
  offsetY = points.y - dragTarget.y;
  console.log("offset", offsetX);
  e.currentTarget.addEventListener("pressmove", puzzleDragMove);
  e.currentTarget.addEventListener("pressup", puzzleDragUp);

  e.currentTarget.originalX = e.currentTarget.x;
  e.currentTarget.originalY = e.currentTarget.y;
}

function puzzleDragMove(e) {
  // console.log("move", dragTarget);
  const points = gameContent.globalToLocal(e.stageX, e.stageY);

  if (!dragTarget) return;
  dragTarget.x = points.x - offsetX;
  dragTarget.y = points.y - offsetY;
}

function puzzleDragUp() {
  dragTarget.removeEventListener("pressmove", puzzleDragMove);
  dragTarget.removeEventListener("pressup", puzzleDragUp);
  checkAnswer();
}

function checkAnswer() {
  const points = bodyModel.globalToLocal(dragTarget.x, dragTarget.y);
  const objects = bodyModel.getObjectsUnderPoint(points.x, points.y);
  console.log("checkAnswer", objects);

  if (objects.length > 0) {
    objects.forEach((obj) => {
      if (dragTarget.name.split("_")[1] === obj.parent.name.split("_")[0]) {
        obj.parent.alpha = 1;
        dragTarget.visible = false;
        checkedPuzzles.push(dragTarget.name.split("_")[1]);
      }
    });
  }
  dragTarget.x = dragTarget.originalX;
  dragTarget.y = dragTarget.originalY;
  dragTarget = null;

  // bodyModel.children.forEach((child) => {
  //   if (organs.includes(child.name)) {
  //     const points = bodyModel.globalToLocal(dragTarget.x, dragTarget.y);
  //     const result = child.hitTest(points.x, points.y);
  //     console.log("result", result, child.name);
  //   }
  // });
}
