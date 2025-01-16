export const isValidUrl = (url: string) => {
  try {
    return new URL(url);
  } catch(err) {
    return false;
  }
};

export function fireEvent(eventName, detail) {
  document.body.dispatchEvent(
    new CustomEvent(eventName, {bubbles: true, detail})
  );
}
