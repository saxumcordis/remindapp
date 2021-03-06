import React from "react";
import { EMemoPriority } from "../../types";
import { Input } from "../Input";

import { useMemoCard } from "../../service/memoCards/useMemoCard";
import { Pinned } from "../../ui/Icons/Pinned";
import { Deadline } from "../../ui/Icons/Deadline";
import { Priority } from "../../ui/Icons/Priority";
import { DateSort } from "../../ui/Icons/DateSort";
import { EMemoPriorityNames } from "../../service/memoCards/service";

import styles from "./MemoCard.module.scss";
import priorityTheme from "../../ui/Priority/Priority.module.scss";
import { useMedia } from "use-media";

type MemoCardHeaderProps = {
  id: string;
  createdTs: string;
  title: string;
  pinned: boolean;
  deadline?: string;
  priority: EMemoPriority;
};

export const MemoCardHeader: React.FC<MemoCardHeaderProps> = ({
  id,
  createdTs,
  title,
  pinned,
  deadline,
  priority,
}) => {
  const { renameMemoCard, pinMemoCard } = useMemoCard();

  const isWide = useMedia({ minWidth: "768px" });

  const handleNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
    renameMemoCard(e.target.value);
  };
  const handlePinMemoCard = () => {
    pinMemoCard(!pinned, id);
  };

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Input
          onClick={(e) => isWide && e.preventDefault()}
          className={styles.inputTitle}
          defaultValue={title}
          placeholder="unnamed memo"
          onChange={handleNewName}
        />
        <span className={styles.date}>
          <DateSort className={styles.dateIcon} />
          {createdTs?.split(",")[0]}
        </span>
      </div>
      <div
        className={styles.controls}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Priority
          className={priorityTheme.themify}
          priority={EMemoPriorityNames[priority]}
        />
        <Deadline deadline={`deadline_${Boolean(deadline)}`} />
        <Pinned
          className={pinned ? styles.pinned : ""}
          onClick={handlePinMemoCard}
        />
      </div>
    </div>
  );
};
