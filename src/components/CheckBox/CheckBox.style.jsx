import styled from "styled-components";

export const StyledCheckBox = styled.div`
  height: 80%;
  aspect-ratio: 1/1;
  background-color: white;
  border-radius: 25%;
  border: 3px solid #376d6d;
  margin-right: 1%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  & > svg {
    ${(props) => (props.$checked ? "display: block;" : "display: none;")}
  }
`;
