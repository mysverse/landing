import { BlogType } from "./ghost";

export const getColour = (blogType: BlogType) => {
  switch (blogType) {
    case "mys":
      return "#FF2A2A";
    case "nws":
      return "#2527B5";
    default:
      return "#000000";
  }
};
