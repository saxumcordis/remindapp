import React from "react";
import { ThemeContainer } from "../../ui/Theme";

import styles from "./Container.module.scss";

export const Container: React.FC = ({ children }) => (
  <ThemeContainer>
    <div className={styles.background}>
      <header className={styles.header}></header>
      <div className={styles.children}>{children}</div>
    </div>
  </ThemeContainer>
);
