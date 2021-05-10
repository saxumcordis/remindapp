import React from "react";

import styles from "./OpenedMenu.module.scss";
import { ThemeSwitcher } from "../../ui/ThemeSwitcher";

export const OpenedMenu: React.FC = () => {
  return (
    <>
      <ThemeSwitcher />
    </>
  );
};
