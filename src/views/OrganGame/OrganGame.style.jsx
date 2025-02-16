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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledCatagoryBtn = styled.div`
  width: calc(20 * var(--vw));
  aspect-ratio: 312/125;
  background-color: #6798ad;
  border-radius: 16px;
  border-bottom: 4px solid #5378a0;
  font-size: calc(4 * var(--vw));
  color: white;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(0.9);
  }
`;

export const StyledSubBtn = styled.div`
  position: absolute;
  bottom: 3%;
  left: 3%;
  display: flex;
  gap: 3%;
`;

export const StyledBtn = styled(BGBtn)`
  width: calc(8 * var(--vw));
  aspect-ratio: 1/1;
`;
