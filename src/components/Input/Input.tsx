import React, { forwardRef } from "react";

import styles from "./Input.module.scss";
import classNames from "classnames";

export type InputProps = JSX.IntrinsicElements["input"];

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      className={classNames(styles.input, className)}
      {...props}
      ref={ref}
    />
  )
);
