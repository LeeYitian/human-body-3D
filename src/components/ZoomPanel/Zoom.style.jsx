import styled from "styled-components";
import { BGBtn } from "@/App.style";

export const StyledContainer = styled.div`
  position: absolute;
  ${(props) => ({ ...props.$position })};
  // transform: translateX(-50%);
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
`;

export const StyledZoomArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  height: calc(6 * var(--vh));
  & > div.range {
    // padding: 1%;
    border-radius: 8px;
    border: 3px solid #4b677f;
    background-color: #b3d6f4;
    height: 70%;
    position: relative;
    flex: 1;
  }
  & input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 75%;
    width: 98%;
    border-radius: 5px;
    background: #90acba;
    position: absolute;
    top: 6%;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: calc(2 * var(--vw));
      height: calc(4 * var(--vw));
      background: #4797c9;
      border-radius: 5px;
      cursor: pointer;
    }
    &::-moz-range-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: calc(2 * var(--vw));
      height: calc(4 * var(--vw));
      background: #4797c9;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

export const StyledZoomBtn = styled(BGBtn)`
  height: 100%;
  aspect-ratio: 1/1;
`;

export const StyledFlipBtn = styled(BGBtn)`
  height: calc(10 * var(--vh));
  aspect-ratio: 1/1;
`;
