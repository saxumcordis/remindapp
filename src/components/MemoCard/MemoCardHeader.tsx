import React from "react";
import { EMemoPriority } from "../../types";
import { Input } from "../Input";

import styles from "./MemoCard.module.scss";
import { useMemoCard } from "../../service/memoCards/useMemoCard";
import { useMemoCards } from "../../service/memoCards/useMemoCards";
import { Pinned } from "../../ui/Icons/Pinned";
import { Deadline } from "../../ui/Icons/Deadline";
import { Priority } from "../../ui/Icons/Priority";

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
  const { activeMemoCard } = useMemoCards();
  const { renameMemoCard } = useMemoCard();
  const handleNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
    renameMemoCard(e.target.value);
  };
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Input
          autoFocus={activeMemoCard?.id === id}
          className={styles.inputTitle}
          defaultValue={title}
          onChange={handleNewName}
        />
        <span className={styles.date}>{createdTs?.split(",")[0]}</span>
      </div>
      <div className={styles.controls}>
        <Priority priority={priority} />
        <Deadline deadline={`deadline_${Boolean(deadline)}`} />
        <Pinned className={pinned ? styles.pinned : ""} />
      </div>
    </div>
  );
};
