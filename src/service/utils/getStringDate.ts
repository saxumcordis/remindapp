export const getStringDate = (date?: string | number) =>
  new Date(date || new Date()).toLocaleString("en-US", {
    timeZone: "Europe/Moscow",
  });
