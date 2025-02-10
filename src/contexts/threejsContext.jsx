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
        liver: models.find(
          (model) => model.name === "Female_Digestive_Liver_Geo"
        ),
        pancreas: models.find(
          (model) => model.name === "Female_Endocrine_Pancreas_Geo"
        ),
        gallbladder: models.find(
          (model) => model.name === "Female_Digestive_Gall_Bladder_Geo"
        ),
        // kidney: models.find(
        //   (model) => model.name === "Female_Digestive_Liver_Geo"
        // ),
        // spleen: models.find(
        //   (model) => model.name === "Female_Digestive_Liver_Geo"
        // ),
        stomach: models.find(
          (model) => model.name === "Female_Digestive_Stomach_Geo"
        ),
        largeIntestine: models.find((model) => model.name === "Tjocktarm"),
        smallIntestine: models.find(
          (model) => model.name === "Female_Digestive_Small_Intestine_Geo"
        ),
        // cecum: models.find(
        //   (model) => model.name === "Female_Digestive_Liver_Geo"
        // ),
        diaphragm: models.find((model) => model.name === "human_organ_system"),
        mouth: models.find(
          (model) => model.name === "Female_Digestive_Mouth_Geo"
        ),
      };
      Object.keys(obj).forEach((key) => {
        obj[key].customName = key;
      });
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
