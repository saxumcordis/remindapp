import React, { useRef } from "react";

import classNames from "classnames";
import { OpenedMenu } from "./OpenedMenu";
import { useHover } from "../../service/hooks/useHover";

import styles from "./Menu.module.scss";

export const Menu: React.FC = () => {
  const hoverRef = useRef(null);
  const isHovered = useHover(hoverRef);

  return (
    <div
      ref={hoverRef}
      className={classNames(styles.container, {
        [styles.containerHovered]: isHovered,
      })}
    >
      <span
        className={classNames(styles.dots, { [styles.rotated]: isHovered })}
      >
        • • •
      </span>
      {isHovered && <OpenedMenu />}
    </div>
  );
};
