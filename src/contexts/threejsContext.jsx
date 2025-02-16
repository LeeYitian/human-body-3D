import { createContext, useContext, useReducer } from "react";

const threejsContext = createContext(null);

export const useThreejs = () => useContext(threejsContext);
const threejsReducer = (state, action) => {
  switch (action.type) {
    case "setCamera":
      return { ...state, camera: action.payload };
    case "setObject":
      return { ...state, object: action.payload };
    case "setObjects":
      const models = action.payload;
      const obj = {
        liver: models.filter(
          (model) => model.name === "Female_Digestive_Liver_Geo"
        ),
        pancreas: models.filter(
          (model) => model.name === "Female_Endocrine_Pancreas_Geo"
        ),
        gallbladder: models.filter(
          (model) => model.name === "Female_Digestive_Gall_Bladder_Geo"
        ),
        kidney: models.filter(
          (model) =>
            model.name === "Female_Endocrine_Adrenal_Gland_Geo_Right" ||
            model.name === "Female_Endocrine_Adrenal_Gland_Geo_Left"
        ),
        // spleen: models.filter(
        //   (model) => model.name === "Female_Digestive_Liver_Geo"
        // ),
        stomach: models.filter((model) => model.name === "Stomach"),
        largeIntestine: models.filter((model) => model.name === "Tjocktarm"),
        smallIntestine: models.filter(
          (model) => model.name === "Female_Digestive_Small_Intestine_Geo"
        ),
        cecum: models.filter((model) => model.name === "Cecum"),
        anus: models.filter((model) => model.name === "anus"),
        esophagus: models.filter((model) => model.name === "esophagus"),
        salivaryGland: models.filter(
          (model) =>
            model.name === "salivary_gland_L001" ||
            model.name === "salivary_gland_L"
        ),
        falciformLigament: models.filter(
          (model) => model.name === "Female_Digestove_Falciform_Ligament_Geo"
        ),
        bileDuct: models.filter(
          (model) => model.name === "Female_Digestive_Bileduct_Geo"
        ),
        diaphragm: models.filter(
          (model) => model.name === "human_organ_system"
        ),
        mouth: models.filter(
          (model) => model.name === "Female_Digestive_Mouth_Geo"
        ),
      };
      // Object.keys(obj).forEach((key) => {
      //   obj[key].customName = key;
      // });
      return { ...state, objects: obj };
    case "setControls":
      return { ...state, controls: action.payload };
  }
};

const initState = {
  camera: null,
  object: null,
  objects: null,
  controls: null,
};
export const ThreeJSProvider = ({ children }) => {
  const [state, dispatch] = useReducer(threejsReducer, initState);

  return (
    <threejsContext.Provider value={{ state, dispatch }}>
      {children}
    </threejsContext.Provider>
  );
};
