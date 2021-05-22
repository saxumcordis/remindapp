export const currentDate = () =>
  new Date().toLocaleString("en-US", {
    timeZone: "Europe/Moscow",
  });
