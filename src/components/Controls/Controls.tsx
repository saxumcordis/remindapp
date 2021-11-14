import React from "react";
import { AddMemoControl } from "./AddMemoControl";
import { SortControl } from "./SortControl";
import { PriorityControl } from "./PriorityControl";

import styles from "./Controls.module.scss";

export const Controls: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.controls}>
        <AddMemoControl />
        <SortControl />
        <PriorityControl />
      </div>
    </nav>
  );
};
