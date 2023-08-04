export const getExtFromName = (name: string) => {
  return name.split(".").pop();
};
