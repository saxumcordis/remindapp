import React from "react";
import { ThemeContainer } from "../../ui/Theme";
import { Dashboard } from "../Dashboard";

import styles from "./Container.module.scss";

export const Container: React.FC = ({ children }) => (
  <ThemeContainer>
    <div className={styles.background}>
      <div className={styles.children}>{children}</div>
      <Dashboard />
    </div>
  </ThemeContainer>
);
