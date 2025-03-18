import styled from "styled-components";
import { BGDiv, BGBtn } from "@/App.style";
import { PATH } from "@/constants/constants";

export const StyledBG = styled(BGDiv)`
  width: 25%;
  height: 100%;
  background-size: cover;
  position: absolute;
  left: ${(props) => (props.$open ? "0" : "-24%")};
  transition: left 0.5s ease-in-out;
  z-index: 3;
`;

export const StyledTitle = styled(BGDiv)`
  width: 150%;
  aspect-ratio: 356/89;
  position: absolute;
  top: 0;
  left: -38%;
`;

export const StyledBottom = styled.div`
  background-color: ${(props) =>
    props.$path === PATH.Organ ? "#7AA6DB" : "transparent"};
  width: 100%;
  height: ${(props) => (props.$path === PATH.Organ ? "25%" : "20%")};
  position: absolute;
  bottom: 0;
  left: -2%;
  ${(props) =>
    props.$path === PATH.Organ
      ? " box-shadow: 8px -20px 10px -10px rgba(0, 0, 0, 0.15);"
      : null}
  padding: 3% 0;
`;

export const StyledSwitch = styled.div`
  background-color: #5f87b0;
  width: 14%;
  height: 15%;
  border-radius: 0px calc(1 * var(--vw)) calc(1 * var(--vw)) 0px;
  position: absolute;
  bottom: 2%;
  right: -12%;
  cursor: pointer;
`;

export const StyledBottomAction = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 5%;
  width: 100%;
  padding: 0 0 0 19%;
  margin-top: 2%;
`;

export const StyledBtn = styled(BGBtn)`
  aspect-ratio: 88/103;
  width: 33%;
`;

export const StyledContentShow = styled.div`
  display: flex;
  width: 100%;
  padding: 0 0 0 7%;
  height: 25%;
`;

export const StyledOption = styled.div`
  display: flex;
  font-size: calc(2 * var(--vw));
  width: 45%;
  flex: 1 1 45%;
  align-items: center;
  margin-bottom: 3%;
  height: 100%;
`;

export const StyledContent = styled.div`
  max-height: 57%;
  overflow-y: auto;
  position: absolute;
  top: 16%;
  left: 2%;
  width: 89%;
  padding: 1%;
`;

export const StyledOrganPanel = styled.div`
  width: 100%;
`;

export const StyledPanelHeader = styled.div`
  background-color: #f8b29e;
  width: 100%;
  height: calc(8 * var(--vh));
  border-radius: ${(props) =>
    props.$open
      ? "calc(1 * var(--vw)) calc(1 * var(--vw)) 0px 0px"
      : "calc(1 * var(--vw))"};
  color: white;
  font-size: calc(4 * var(--vh));
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4%;
  & > div {
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 4%;
  }
`;

export const StyledPanelContent = styled.div`
  ${(props) => (props.$open ? "display: flex;" : "display: none;")}
  background-color: #f8b29e;
  width: 100%;
  border-radius: 0px 0px calc(1 * var(--vw)) calc(1 * var(--vw));
  // display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledPanelOption = styled.div`
  width: 100%;
  height: calc(5 * var(--vh));
  display: flex;
  align-items: center;
  font-size: calc(3.5 * var(--vh));
  margin-bottom: 3%;
  padding-left: 17%;
  & > span {
    color: white;
    // background-color: #bdf4ed;
    // border-radius: 8px;
    // border-bottom: 4px solid #76a59d;
    flex: 1;
    // text-align: center;
    margin-left: 4%;
    cursor: pointer;
  }
`;

export const StyledSystemPanel = styled.div`
  background-color: #6798ad;
  height: calc(10 * var(--vh));
  font-size: calc(4 * var(--vh));
  margin-bottom: 7%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: calc(1 * var(--vw));
  ${(props) =>
    props.$active
      ? "box-shadow: 1px 1px 20px -10px rgb(255, 234, 0), -1px -1px 20px -10px rgb(255, 234, 0), 1px -1px 20px -10px rgb(255, 234, 0), -1px 1px 20px -10px rgb(255, 234, 0);"
      : "box-shadow: none;"}
`;

export const StyledSideArrow = styled.div`
  position: absolute;
  height: 100%;
  width: 5%;
  // left: 22%;
  z-index: 2;
  transition: all 0.5s ease-in-out;
  & > svg {
    height: 100%;
    font-size: calc(10 * var(--vw));
    cursor: pointer;
  }
`;
