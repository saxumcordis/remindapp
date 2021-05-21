import { EMemoPriority } from "../../types";

const colorByTheme = {
  [EMemoPriority.Critical]: "#c81111",
  [EMemoPriority.Major]: "#b40bbe",
  [EMemoPriority.Low]: "#63d297",
};

export const themifyObject = (theme: EMemoPriority) => {
  const color = colorByTheme[theme];

  return {
    boxShadow: "0 0 7px " + color,
    borderColor: color,
  };
};
