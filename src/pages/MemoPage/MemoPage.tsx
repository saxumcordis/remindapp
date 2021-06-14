import React from "react";

import { useMemoCards } from "../../service/memoCards/useMemoCards";
import { NotFound } from "../../components/NotFound";

import { MemoPageInfo } from "./MemoPageInfo";
import { useMemoCard } from "../../service/memoCards/useMemoCard";
import { Pinned } from "../../ui/Icons/Pinned";
import { Back } from "../../ui/Icons/Back";
import classNames from "classnames";
import { useHistory } from "react-router";
import { Priority } from "../../ui/Icons/Priority";
import { EMemoPriorityNames } from "../../service/memoCards/service";

import styles from "./MemoPage.module.scss";
import { MemoCardDeadline } from "../../components/MemoCard/MemoCardDeadline";

export const MemoPage: React.FC = () => {
  const { activeMemoCard } = useMemoCards();

  const { pinMemoCard } = useMemoCard();

  const history = useHistory();

  if (!activeMemoCard) return <NotFound />;

  const handlePinMemoCard = () => {
    pinMemoCard(!activeMemoCard.pinned, activeMemoCard.id);
  };

  const handleReturn = () => {
    history.push("/");
  };

  const priority = EMemoPriorityNames[activeMemoCard.priority];

  return (
    <div className={styles.header}>
      <MemoPageInfo
        title={activeMemoCard.title}
        createdTs={activeMemoCard.createdTs}
        modifiedTime={activeMemoCard.modifiedTime}
        priority={priority}
        deadline={activeMemoCard.deadline}
      />
      <div className={styles.controls}>
        <MemoCardDeadline deadline={activeMemoCard.deadline} />
        <span
          style={{ width: "120px", opacity: 0.5 }}
          className={classNames(styles.control, styles.hoverActive)}
        >
          <Priority className={styles.icon} priority={priority} />
          Set priority
        </span>
        <span
          style={{ width: "80px" }}
          className={classNames(styles.control, styles.hoverActive)}
          onClick={handlePinMemoCard}
        >
          <Pinned
            className={styles.icon}
            status={activeMemoCard.pinned ? "activePin" : ""}
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
  );
};
