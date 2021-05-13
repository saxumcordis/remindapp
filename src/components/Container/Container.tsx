import React from "react";
import { ThemeContainer } from "../../ui/Theme";
import { Menu } from "../Menu";

import styles from "./Container.module.scss";

export const Container: React.FC = ({ children }) => (
  <ThemeContainer>
    <div className={styles.background}>
      <div className={styles.children}>{children}</div>
      <Menu />
    </div>
  </ThemeContainer>
);
