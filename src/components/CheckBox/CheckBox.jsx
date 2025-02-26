import { Icon } from "@iconify/react/dist/iconify.js";
import { StyledCheckBox } from "./CheckBox.style";

const CheckBox = ({ checked, updateState }) => {
  return (
    <StyledCheckBox
      $checked={checked}
      onClick={() => {
        updateState();
      }}
    >
      <Icon icon="iconamoon:check-bold" color="#294654" />
    </StyledCheckBox>
  );
};

export default CheckBox;
