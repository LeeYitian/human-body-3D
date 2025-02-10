import styled from "styled-components";
import { BGDiv, BGBtn } from "@/App.style";
import { PATH } from "@/constants/constants";

export const StyledContainer = styled(BGDiv)`
  width: calc(40 * var(--vw));
  aspect-ratio: 367/265;
  padding: 4% 2% 2%;
  position: absolute;
  top: 24%;
  left: ${(props) => (props.$path === PATH.Organ ? "43%" : "26%")};
  z-index: 3;
`;

export const StyledCloseBtn = styled(BGBtn)`
  position: absolute;
  top: 5%;
  right: 3%;
  width: calc(4.3 * var(--vw));
  aspect-ratio: 1/1;
`;

export const StyledPageBtn = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // width: 12%;
  color: #7eb7af;
  & > svg {
    cursor: pointer;
    font-size: calc(4 * var(--vw));
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
  margin-bottom: 8%;
  & span {
    background-color: #6798ad;
    padding: 2%;
    margin: 1%;
    color: white;
    border-radius: 8px;
    border-bottom: 3px solid #5378a0;
    font-size: calc(1.8 * var(--vw));
    min-width: calc(10 * var(--vw));
    height: calc(8 * var(--vh));
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
  width: 100%;
  font-size: calc(2.5 * var(--vw));
  color: #54697a;
  white-space: pre-line;
`;
