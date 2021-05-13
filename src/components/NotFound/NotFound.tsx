import React from "react";

import styles from "./NotFound.module.scss";

type NotFoundProps = {
  message?: string;
};

export const NotFound: React.FC<NotFoundProps> = ({ message }) => {
  return (
    <div className={styles.container}>
      <span>Oops, {message} not found</span>
    </div>
  );
};
