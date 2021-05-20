import React from "react";
import { useMemoCards } from "../../service/memoCards/useMemoCards";
import { MemoCard } from "../MemoCard";

import styles from "./Dashboard.module.scss";
import Masonry from "react-masonry-css";

export const Dashboard: React.FC = () => {
  const { memoCards } = useMemoCards();

  const breakpointCols = {
    default: 4,
    1100: 4,
    900: 3,
    600: 2,
    400: 1,
  };

  return (
    <Masonry
      className={styles.dashboard}
      columnClassName={styles.column}
      breakpointCols={breakpointCols}
    >
      {memoCards.map((memoCard) => (
        <MemoCard memoCard={memoCard} />
      ))}
    </Masonry>
  );
};
