import React from "react";
import { useTheme } from "../Theme";

import styles from "./ThemeSwitcher.module.scss";
import { Light } from "./Light";
import { Dark } from "./Dark";

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const onClick = () =>
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));

  return (
    <button onClick={onClick} className={styles.button}>
      {theme === "light" ? (
        <Dark className={styles.icon} />
      ) : (
        <Light className={styles.icon} />
      )}
    </button>
  );
};
