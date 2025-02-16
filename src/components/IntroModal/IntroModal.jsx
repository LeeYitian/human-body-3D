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
import { useState } from "react";

const IntroModal = ({ setShowModal, data }) => {
  const { path, goto } = usePath();
  const [contentPage, setContentPage] = useState(0);
  return (
    <Draggable>
      <StyledContainer $imgSrc="./assets/modalBG.png" $path={path}>
        <StyledCloseBtn
          $imgSrc="./assets/closeModalBtn.png"
          onClick={() => setShowModal(false)}
        />
        <StyledHead>
          {data?.title || ""}
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
        <StyledContent>{data?.content[contentPage] || ""}</StyledContent>
        {data?.content.length > 1 && (
          <StyledPageBtn>
            <Icon
              icon="bx:left-arrow"
              onClick={() => setContentPage(Math.max(0, contentPage - 1))}
            />
            <Icon
              icon="bxs:right-arrow"
              onClick={() =>
                setContentPage(
                  Math.min(data?.content.length - 1, contentPage + 1)
                )
              }
            />
          </StyledPageBtn>
        )}
      </StyledContainer>
    </Draggable>
  );
};

export default IntroModal;
