import classNames from "classnames";
import styles from "./Controls.module.scss";
import React, { useRef } from "react";
import { useHover } from "../../service/hooks/useHover";
import { useMemoCards } from "../../service/memoCards/useMemoCards";

export const AddMemoControl: React.FC = () => {
  const { addMemoCard } = useMemoCards();

  const hoverRef = useRef(null);
  const isHovered = useHover(hoverRef);

  return (
    <button
      className={classNames(styles.add, {
        [styles.addHovered]: isHovered,
        [styles.rotated]: isHovered,
      })}
      ref={hoverRef}
    >
      <span className={styles.hiddenText}>+</span>
      {isHovered && (
        <span onClick={addMemoCard} className={styles.addText}>
          Add memo
        </span>
      )}
    </button>
  );
};
