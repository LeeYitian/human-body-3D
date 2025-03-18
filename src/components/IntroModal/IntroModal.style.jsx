import styled from "styled-components";
import { BGBtn } from "@/App.style";
import { PATH } from "@/constants/constants";

export const StyledContainer = styled.div`
  width: calc(35 * var(--vw));
  background-color: #edece6;
  border: 2px solid #84a8ad;
  border-radius: calc(2 * var(--vw));
  min-height: calc(45 * var(--vh));
  // aspect-ratio: 367/265;
  padding: 1% 2% 2%;
  position: absolute;
  top: 15%;
  left: ${(props) => (props.$path === PATH.Organ ? "55%" : "26%")};
  z-index: 3;
  font-family: "微軟正黑體";
  font-weight: bold;
  & hr {
    margin: 0;
  }
`;

export const StyledCloseBtn = styled(BGBtn)`
  position: absolute;
  top: 1%;
  right: 1%;
  width: calc(3.5 * var(--vw));
  aspect-ratio: 1/1;
`;

export const StyledPageBtn = styled.div`
  position: absolute;
  // top: -60%;
  bottom: 2%;
  right: 2%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // width: 12%;
  color: #7eb7af;
  & > svg {
    cursor: pointer;
    font-size: calc(3 * var(--vw));
    &:hover {
      transform: scale(0.8);
    }
  }
`;

export const StyledHead = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1%;
  font-size: calc(2.5 * var(--vw));
  color: #54697a;
  margin-bottom: 2%;
  & span {
    background-color: #6798ad;
    padding: 2%;
    margin: 1%;
    color: white;
    border-radius: calc(0.8 * var(--vw));
    border-bottom: calc(0.3 * var(--vw)) solid #5378a0;
    font-size: calc(1.8 * var(--vw));
    min-width: calc(10 * var(--vw));
    height: calc(7 * var(--vh));
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      transform: scale(0.9);
    }
  }
`;

export const StyledContent = styled.div`
  position: relative;
  width: 100%;
  max-height: ${(props) => props.$height};
  font-size: calc(2.2 * var(--vw));
  color: #54697a;
  white-space: pre-line;
  overflow-y: auto;
`;

export const StyledActionArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3%;
  width: 100%;
  height: calc(8 * var(--vh));
  position: relative;
  margin-top: 1%;
`;

export const StyledActionBtn = styled(BGBtn)`
  width: 30%;
  height: 100%;
  cursor: pointer;
  &:hover {
    transform: scale(0.9);
  }
`;
