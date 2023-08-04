const extColour = {
  pdf: "purple",
  xls: "green",
  doc: "blue",
  txt: "blue",
  png: "orange",
  jpg: "orange",
  jpeg: "orange",
  zip: "red",
  default: "gray",
} as const;

export type Extension = keyof typeof extColour;
export type Colour = (typeof extColour)[Extension];

export const getExtColour = (ext: string | undefined): Colour => {
  if (!(ext && Object.keys(extColour).includes(ext))) return extColour.default;
  return extColour[ext as Extension];
};
