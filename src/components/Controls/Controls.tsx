import React, { useRef } from "react";

import styles from "./Controls.module.scss";
import { useMemoCards } from "../../service/memoCards/useMemoCards";
import { useHover } from "../../service/hooks/useHover";
import classNames from "classnames";

export const Controls: React.FC = () => {
  const { addMemoCard } = useMemoCards();

  const hoverRef = useRef(null);
  const isHovered = useHover(hoverRef);

  return (
    <nav className={styles.nav}>
      <button
        className={classNames(styles.add, { [styles.addHovered]: isHovered })}
        onClick={addMemoCard}
        ref={hoverRef}
      >
        <span
          className={classNames(styles.plus, { [styles.rotated]: isHovered })}
        >
          +
        </span>
        {isHovered && <span className={styles.addText}>Add memo</span>}
      </button>
    </nav>
  );
};
