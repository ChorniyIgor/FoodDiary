import { appLogout } from "./appLogout";

export const autoLogout = (time) => () => {
  setTimeout(() => {
    appLogout();
  }, time * 10000);
};
