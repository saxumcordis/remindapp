import React, { useRef } from "react";
import classNames from "classnames";
import styles from "./Controls.module.scss";
import { Priority } from "../../ui/Icons/Priority";
import { useHover } from "../../service/hooks/useHover";
import { useFiltering } from "../../service/memoCards/useFiltering";

export const PriorityControl: React.FC = () => {
  const { setShowPriority, showPriority } = useFiltering();

  const hoverRef = useRef(null);
  const isHovered = useHover(hoverRef);

  const handleShowPriority = () => setShowPriority(!showPriority);

  return (
    <button
      className={classNames(
        styles.priority,
        { [styles.priorityHovered]: isHovered },
        { [styles.rotated]: isHovered }
      )}
      ref={hoverRef}
    >
      <span className={styles.hiddenText}>
        <Priority
          className={styles.icon}
          priority={showPriority ? "active" : ""}
        />
      </span>
      {isHovered && (
        <span onClick={handleShowPriority} className={styles.priorityText}>
          Show priority
        </span>
      )}
    </button>
  );
};
