import styled from "styled-components";
import { BGBtn } from "@/App.style";

export const StyledContainer = styled.div`
  position: absolute;
  background-color: #9db0ec;
  border-radius: 50px;
  // height: calc(8 * var(--vh));
  right: 1%;
  bottom: 13%;
  padding: 1% 2%;
  display: flex;
  align-items: center;
  box-shadow: 5px 5px 25px -10px rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export const StyledSwitch = styled.div`
  border-right: 3px solid #54697a;
  margin-right: 2%;
  cursor: pointer;
  display: flex;
  align-items: center;
  & > svg {
    height: 100%;
    font-size: calc(5 * var(--vw));
  }
`;

export const StyledBtnArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledBtn = styled(BGBtn)`
  aspect-ratio: 88/103;
  width: calc(6 * var(--vw));
  margin-right: 2%;
`;

export const StyledMenuText = styled.div`
  color: #54697a;
  font-size: calc(2.5 * var(--vw));
  white-space: nowrap;
  margin-left: 5%;
  line-height: 2.5;
`;
