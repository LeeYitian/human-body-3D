import Draggable from "react-draggable";
import {
  StyledActionArea,
  StyledActionBtn,
  StyledCloseBtn,
  StyledContainer,
  StyledContent,
  StyledHead,
  StyledPageBtn,
} from "./IntroModal.style";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePath } from "@/contexts/pathContext";
import { PATH } from "@/constants/constants";
import { useEffect, useState } from "react";
import { sendUntargetOrgan } from "@/utils/message";

const IntroModal = ({ setShowModal, data }) => {
  const { path, goto } = usePath();
  const [contentIndex, setContentIndex] = useState(0);
  const [contentPage, setContentPage] = useState(0);

  useEffect(() => {
    setContentPage(0);
  }, [contentIndex]);

  return (
    <Draggable>
      <StyledContainer $imgSrc="./assets/modalBG.png" $path={path}>
        <StyledCloseBtn
          $imgSrc="./assets/closeModalBtn.png"
          onClick={() => {
            setShowModal(false);
            sendUntargetOrgan();
          }}
          onTouchStart={() => {
            setShowModal(false);
            sendUntargetOrgan();
          }}
        />
        <StyledHead>
          {data?.title || ""}
          {path === PATH.Organ && (
            <span
              onClick={() => {
                goto(PATH.Organ);
                setShowModal(false);
              }}
              onTouchStart={() => {
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
              onTouchStart={() => {
                goto(PATH.System);
                setShowModal(false);
              }}
            >
              消化系統
            </span>
          )}
        </StyledHead>
        {path === PATH.Organ && (
          <StyledContent $height="70%">
            {data?.content[contentIndex]
              ? data?.content[contentIndex][contentPage]
              : ""}
            <StyledActionArea>
              <StyledActionBtn
                $imgSrc={`./assets/modal_position${
                  contentIndex === 0 ? "_active" : ""
                }.png`}
                onClick={() => setContentIndex(0)}
                onTouchStart={() => setContentIndex(0)}
              />
              <StyledActionBtn
                $imgSrc={`./assets/modal_function${
                  contentIndex === 1 ? "_active" : ""
                }.png`}
                onClick={() => setContentIndex(1)}
                onTouchStart={() => setContentIndex(1)}
              />
              <StyledActionBtn
                $imgSrc={`./assets/modal_impact${
                  contentIndex === 2 ? "_active" : ""
                }.png`}
                onClick={() => setContentIndex(2)}
                onTouchStart={() => setContentIndex(2)}
              />
              {data?.content[contentIndex]?.length > 1 && (
                <StyledPageBtn>
                  <Icon
                    icon="bx:left-arrow"
                    onClick={() => setContentPage(Math.max(0, contentPage - 1))}
                    onTouchStart={() =>
                      setContentPage(Math.max(0, contentPage - 1))
                    }
                  />
                  <Icon
                    icon="bxs:right-arrow"
                    onClick={() =>
                      setContentPage(
                        Math.min(data?.content.length - 1, contentPage + 1)
                      )
                    }
                    onTouchStart={() =>
                      setContentPage(
                        Math.min(data?.content.length - 1, contentPage + 1)
                      )
                    }
                  />
                </StyledPageBtn>
              )}
            </StyledActionArea>
          </StyledContent>
        )}
        {path === PATH.System && (
          <>
            <StyledContent $height="80%">
              {data?.content[contentPage] || ""}
            </StyledContent>
            {data?.content.length > 1 && (
              <StyledPageBtn>
                <Icon
                  icon="bx:left-arrow"
                  onClick={() => setContentPage(Math.max(0, contentPage - 1))}
                  onTouchStart={() =>
                    setContentPage(Math.max(0, contentPage - 1))
                  }
                />
                <Icon
                  icon="bxs:right-arrow"
                  onClick={() =>
                    setContentPage(
                      Math.min(data?.content.length - 1, contentPage + 1)
                    )
                  }
                  onTouchStart={() =>
                    setContentPage(
                      Math.min(data?.content.length - 1, contentPage + 1)
                    )
                  }
                />
              </StyledPageBtn>
            )}
          </>
        )}
      </StyledContainer>
    </Draggable>
  );
};

export default IntroModal;
