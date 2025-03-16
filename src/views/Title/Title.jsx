import { PATH } from "@/constants/constants";
import {
  StyledBG,
  StyledInstrucBtn,
  StyledMainAction,
  StyledMainBtn,
} from "./Title.style";
import { usePath } from "@/contexts/pathContext.jsx";
import { useMode } from "@/contexts/modeContext";
import { useEffect } from "react";
import { MODE } from "@/constants/constants";

const Title = () => {
  const { goto } = usePath();
  const { switchMode } = useMode();

  return (
    <StyledBG $imgSrc="./assets/titleBG.png">
      <StyledInstrucBtn
        $imgSrc="./assets/instructionBtn.png"
        onClick={() => window.open("./howTo/index.html", "_blank")}
      ></StyledInstrucBtn>
      <StyledMainAction>
        <StyledMainBtn
          $imgSrc="./assets/organBtn.png"
          onClick={() => goto(PATH.Organ)}
        />
        <StyledMainBtn
          $imgSrc="./assets/systemBtn.png"
          onClick={() => goto(PATH.System)}
        />
      </StyledMainAction>
    </StyledBG>
  );
};

export default Title;
