import styled from "styled-components";
import { BGDiv, BGBtn } from "@/App.style";

export const StyledBG = styled(BGDiv)`
  width: 100%;
  height: 100%;
  background-size: cover;
  position: relative;
`;

export const StyledGameCatagory = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: calc(3 * var(--vw));
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledCatagoryBtn = styled(BGBtn)`
  width: calc(20 * var(--vw));
  aspect-ratio: 312/125;
  cursor: pointer;
  &:hover {
    transform: scale(0.9);
  }
  ${(props) =>
    props.$disabled && "cursor: default; &:hover { transform: none; }"}
`;

export const StyledSubBtn = styled.div`
  position: absolute;
  bottom: 8%;
  left: 1%;
  display: flex;
  flex-direction: column;
  gap: 3%;
`;

export const StyledBtn = styled(BGBtn)`
  width: calc(8 * var(--vw));
  aspect-ratio: 1/1;
`;
