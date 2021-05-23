import React from "react";

import { useMemoCards } from "../../service/memoCards/useMemoCards";
import { NotFound } from "../../components/NotFound";

import styles from "./MemoPage.module.scss";
import { Input } from "../../components/Input";
import { useMemoCard } from "../../service/memoCards/useMemoCard";
import { Pinned } from "../../ui/Icons/Pinned";
import { DateSort } from "../../ui/Icons/DateSort";
import { Back } from "../../ui/Icons/Back";
import classNames from "classnames";
import { useHistory } from "react-router";

export const MemoPage: React.FC = () => {
  const { activeMemoCard } = useMemoCards();

  const { renameMemoCard, pinMemoCard } = useMemoCard();

  const history = useHistory();

  if (!activeMemoCard) return <NotFound />;

  const handleNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
    renameMemoCard(e.target.value);
  };

  const handlePinMemoCard = () => {
    pinMemoCard(!activeMemoCard.pinned, activeMemoCard.id);
  };

  const handleReturn = () => {
    history.push("/");
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.info}>
          <Input
            className={styles.title}
            defaultValue={activeMemoCard.title}
            onChange={handleNewName}
          />
          <span className={styles.date}>
            <DateSort className={styles.icon} />
            {activeMemoCard.createdTs}
          </span>
        </div>
        <div className={styles.controls}>
          <span
            className={classNames(styles.control, styles.hoverActive)}
            onClick={handlePinMemoCard}
          >
            <Pinned
              className={styles.icon}
              status={activeMemoCard.pinned ? "pinned" : ""}
            />
            {!activeMemoCard.pinned ? "Pin" : "Unpin"}
          </span>
          <span
            className={classNames(styles.control, styles.shortControl)}
            onClick={handleReturn}
          >
            <Back className={classNames(styles.icon, styles.hoverActive)} />
          </span>
        </div>
      </div>
    </div>
  );
};
