import React, { forwardRef, InputHTMLAttributes, useMemo } from "react";
import classNames from "classnames";
import styles from "./Checkbox.module.scss";
import { v4 } from "uuid";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "hidden"
>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, className, ...props }, ref) => {
    const realId = useMemo(() => id || v4(), [id]);

    return (
      <div className={classNames(styles.size, className)}>
        <input id={realId} type="checkbox" hidden ref={ref} {...props} />
        <label htmlFor={realId} className={styles.checkbox} />
      </div>
    );
  }
);
