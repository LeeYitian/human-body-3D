import styled from "styled-components";

export const StyledCheckBox = styled.div`
  height: 70%;
  aspect-ratio: 1/1;
  background-color: white;
  border-radius: 25%;
  border: calc(0.3 * var(--vw)) solid #6e6e99;
  margin-right: 1%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  & > svg {
    ${(props) => (props.$checked ? "display: block;" : "display: none;")}
    position: absolute;
    font-size: calc(2 * var(--vw));
  }
`;
