import styled from "styled-components";
import { BGBtn } from "@/App.style";

export const StyledMainBtn = styled(BGBtn)`
  position: absolute;
  right: 1%;
  bottom: 20%;
  width: calc(6 * var(--vw));
  aspect-ratio: 1/1;
  display: ${(props) => (props.$open ? "none" : "block")};
  z-index: 2;
`;

export const StyledInfoPanel = styled.div`
  background-color: #99c2d6;
  border-radius: 16px;
  border: 3px solid #61929b;
  width: 30%;
  aspect-ratio: 497/608;
  position: absolute;
  top: 6%;
  right: 2%;
  display: ${(props) => (props.$open ? "flex" : "none")};
  justify-content: space-between;
  padding: 3% 1% 1%;
  z-index: 2;
  & ${StyledMainBtn} {
    top: -8%;
    bottom: unset;
    right: unset;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const StyledPanelColumn = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
`;

export const StyledSystemOption = styled.div`
  height: calc(5 * var(--vh));
  display: flex;
  align-items: center;
  margin-bottom: 18%;
  & > span {
    background-color: #6798ad;
    border-radius: 8px;
    border-bottom: 4px solid #5378a0;
    flex: 1;
    text-align: center;
    cursor: pointer;
    line-height: 2;
    margin-left: 4%;
  }
`;

export const StyledOrganOption = styled.div`
  height: calc(4 * var(--vh));
  width: 80%;
  align-self: center;
  display: flex;
  align-items: center;
  margin-bottom: 12%;
  & > span {
    color: #54697a;
    background-color: #bdf4ed;
    border-radius: 8px;
    border-bottom: 4px solid #76a59d;
    flex: 1;
    margin-left: 4%;
    text-align: center;
    font-size: calc(2 * var(--vw));
    cursor: pointer;
    // line-height: 2;
    height: calc(6 * var(--vh));
  }
`;
