import styled from "styled-components";

export const BGDiv = styled.div`
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url(${(props) => props.$imgSrc});
`;

export const BGBtn = styled(BGDiv)`
  cursor: pointer;
  &:hover {
    transform: scale(0.9);
  }
`;
