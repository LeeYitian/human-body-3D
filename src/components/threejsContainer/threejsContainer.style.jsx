import styled from "styled-components";
import { MODE } from "@/constants/constants";

export const StyledLoadingContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4;
  display: ${(props) =>
    props.$loading && props.$mode === MODE["3D"] ? "flex" : "none"};
  justify-content: center;
  align-items: center;
  & > img {
    width: calc(5 * var(--vw));
  }
`;
