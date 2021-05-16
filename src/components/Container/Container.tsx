import React from "react";
import { ThemeContainer } from "../../ui/Theme";
import { Menu } from "../Menu";
import { Link } from "react-router-dom";

import styles from "./Container.module.scss";
import { Home } from "./Home";

export const Container: React.FC = ({ children }) => (
  <ThemeContainer>
    <div className={styles.background}>
      <div className={styles.header}>
        <Link to="/">
          <span>
            REM
            <Home className={styles.icon} />
            IND
          </span>
        </Link>
      </div>
      <div className={styles.children}>{children}</div>
      <Menu />
    </div>
  </ThemeContainer>
);
