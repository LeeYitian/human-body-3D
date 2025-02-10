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
      <Icon icon="material-symbols:check-rounded" color="#376d6d" />
    </StyledCheckBox>
  );
};

export default CheckBox;
