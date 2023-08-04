export const isImage = (ext: string | undefined) => {
  if (!ext) return false;
  return ["jpg", "jpeg", "png", "gif"].includes(ext);
};
