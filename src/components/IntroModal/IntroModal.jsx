import Draggable from "react-draggable";
import {
  StyledCloseBtn,
  StyledContainer,
  StyledContent,
  StyledHead,
  StyledPageBtn,
} from "./IntroModal.style";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePath } from "@/contexts/pathContext";
import { PATH } from "@/constants/constants";

const IntroModal = ({ setShowModal }) => {
  const { path, goto } = usePath();

  return (
    <Draggable>
      <StyledContainer $imgSrc="./assets/modalBG.png" $path={path}>
        <StyledCloseBtn
          $imgSrc="./assets/closeModalBtn.png"
          onClick={() => setShowModal(false)}
        />
        <StyledHead>
          器官名稱
          {path === PATH.Organ && (
            <span
              onClick={() => {
                goto(PATH.Organ);
                setShowModal(false);
              }}
            >
              腹腔
            </span>
          )}
          {path === PATH.Organ && (
            <span
              onClick={() => {
                goto(PATH.System);
                setShowModal(false);
              }}
            >
              消化系統
            </span>
          )}
        </StyledHead>
        <StyledContent>以下為器官介紹。</StyledContent>
        <StyledPageBtn>
          <Icon icon="bx:left-arrow" />
          <Icon icon="bxs:right-arrow" />
        </StyledPageBtn>
      </StyledContainer>
    </Draggable>
  );
};

export default IntroModal;
