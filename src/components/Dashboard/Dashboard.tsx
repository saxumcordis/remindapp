import React from "react";
import { useMemoCards } from "../../service/memoCards/useMemoCards";
import { MemoCard } from "../MemoCard";

import styles from "./Dashboard.module.scss";
import Masonry from "react-masonry-css";
import {
  getPinnedMemoCards,
  getUnPinnedMemoCards,
  sortByField,
  sortByOrder,
} from "../../service/memoCards/service";
import { useFiltering } from "../../service/memoCards/useFiltering";

export const Dashboard: React.FC = () => {
  const { memoCards } = useMemoCards();
  const { filter, filterOrder } = useFiltering();

  const [pinnedMemoCards, unPinnedMemoCards] = [
    getPinnedMemoCards(memoCards),
    getUnPinnedMemoCards(memoCards),
  ].map((e) => sortByOrder(sortByField(e, filter), filterOrder));

  const breakpointCols = {
    default: 4,
    1100: 4,
    900: 3,
    600: 2,
    400: 1,
  };

  return (
    <>
      <Masonry
        className={styles.dashboard}
        columnClassName={styles.column}
        breakpointCols={breakpointCols}
      >
        {pinnedMemoCards.map((memoCard) => (
          <MemoCard key={memoCard.id} memoCard={memoCard} />
        ))}
      </Masonry>
      <Masonry
        className={styles.dashboard}
        columnClassName={styles.column}
        breakpointCols={breakpointCols}
      >
        {unPinnedMemoCards.map((memoCard) => (
          <MemoCard key={memoCard.id} memoCard={memoCard} />
        ))}
      </Masonry>
    </>
  );
};
