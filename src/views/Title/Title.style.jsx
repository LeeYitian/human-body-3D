import styled from "styled-components";
import { BGBtn, BGDiv } from "@/App.style";

export const StyledBG = styled(BGDiv)`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const StyledInstrucBtn = styled(BGBtn)`
  position: absolute;
  width: calc(7 * var(--vw));
  aspect-ratio: 88/103;
  bottom: 4%;
  left: 5%;
`;

export const StyledMainAction = styled.div`
  position: absolute;
  width: 74%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // height: 20%;
  bottom: 16%;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledMainBtn = styled(BGBtn)`
  width: 45%;
  aspect-ratio: 350/168;
`;
