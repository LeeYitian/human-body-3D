import { Icon } from "@iconify/react/dist/iconify.js";
import {
  StyledBtn,
  StyledBtnArea,
  StyledContainer,
  StyledMenuText,
  StyledSwitch,
} from "./Menu.style";
import { usePath } from "@/contexts/pathContext";
import { PATH } from "@/constants/constants";
import { useState } from "react";
import IntroModal from "../IntroModal/IntroModal";

const menu = {
  [PATH.Organ]: [
    { id: "mode", src: "./assets/switch3DBtn.png" },
    { id: "game", src: "./assets/gameBtn.png" },
  ],
  [PATH.System]: [
    { id: "animation", src: "./assets/playAnimationBtn.png" },
    { id: "intro", src: "./assets/systemIntroBtn.png" },
    { id: "mode", src: "./assets/switch3DBtn.png" },
    { id: "game", src: "./assets/gameBtn.png" },
  ],
};

const Menu = ({ setMode }) => {
  const { path } = usePath();
  const [openMenu, setOpenMenu] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (id) => {
    switch (id) {
      case "mode":
        setMode();
        break;
      case "intro":
        setShowModal(true);
        break;
    }
  };
  return (
    <>
      <StyledContainer>
        <StyledSwitch onClick={() => setOpenMenu(!openMenu)}>
          <Icon
            icon={
              openMenu
                ? "icon-park-solid:right-one"
                : "icon-park-solid:left-one"
            }
            color="#54697A"
          />
        </StyledSwitch>
        <StyledBtnArea>
          {openMenu &&
            menu[path].map((btn) => (
              <StyledBtn
                $imgSrc={btn.src}
                onClick={() => handleClick(btn.id)}
              />
            ))}
          {!openMenu && <StyledMenuText>教學箱</StyledMenuText>}
        </StyledBtnArea>
      </StyledContainer>
      {showModal && <IntroModal setShowModal={setShowModal} />}
    </>
  );
};

export default Menu;
