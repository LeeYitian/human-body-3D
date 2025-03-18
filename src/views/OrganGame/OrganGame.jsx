import {
  StyledBG,
  StyledBtn,
  StyledCatagoryBtn,
  StyledGameCatagory,
  StyledSubBtn,
} from "./OrganGame.style";
import { usePath } from "@/contexts/pathContext";
import { PATH } from "@/constants/constants";
import { useState } from "react";
import ZoomPanel from "@/components/ZoomPanel/ZoomPanel";
import { sendLoadGame } from "../../utils/message";

const OrganGame = () => {
  const { goto } = usePath();
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <StyledBG $imgSrc="./assets/mainBG.png">
      {selectedGame === null && (
        <>
          <StyledGameCatagory>
            <StyledCatagoryBtn
              $imgSrc="./assets/gameChoose_chest.png"
              $disabled
            />
            <StyledCatagoryBtn
              $imgSrc="./assets/gameChoose_abdomen.png"
              $disabled={false}
              onClick={() => {
                setSelectedGame("abdominal_puzzle");
                sendLoadGame("abdominal_puzzle");
              }}
            />
            <StyledCatagoryBtn
              $imgSrc="./assets/gameChoose_pelvic.png"
              $disabled
            />
          </StyledGameCatagory>
          <StyledSubBtn>
            <StyledBtn
              $imgSrc="./assets/prevPageBtn.png"
              onClick={() => goto(PATH.Organ)}
            />
            <StyledBtn
              $imgSrc="./assets/backToMainBtn_noText.png"
              onClick={() => goto(PATH.Title)}
            />
          </StyledSubBtn>
        </>
      )}
      <iframe
        id="canvas2D"
        src="./flash.html"
        style={{ display: selectedGame ? "block" : "none" }}
      />
      {selectedGame && (
        <>
          <StyledBtn
            style={{ position: "absolute", bottom: "23%", left: "1%" }}
            $imgSrc="./assets/prevPageBtn.png"
            onClick={() => setSelectedGame(null)}
          />
          <StyledBtn
            style={{ position: "absolute", bottom: "10%", left: "1%" }}
            $imgSrc="./assets/closeGame.png"
            onClick={() => goto(PATH.Organ)}
          />
          <ZoomPanel position={{ bottom: "1%", left: "1%" }} />
        </>
      )}
    </StyledBG>
  );
};

export default OrganGame;
