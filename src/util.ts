export const isValidUrl = (url: string) => {
  try {
    return new URL(url);
  } catch(err) {
    return false;
  }
};
