export const stringToObject = (str) => {
  const obj = {};
  str.split(",").forEach((part) => {
    const [key, value] = part.split(":").map((s) => s.trim());
    if (key && value) {
      obj[key] = value;
    }
  });
  return obj;
};
