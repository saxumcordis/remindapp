import styles from "./MemoPage.module.scss";
import { Input } from "../../components/Input";
import { DateSort } from "../../ui/Icons/DateSort";
import { Priority } from "../../ui/Icons/Priority";
import classNames from "classnames";
import priorityTheme from "../../ui/Priority/Priority.module.scss";
import { UpdateDateSort } from "../../ui/Icons/UpdateDateSort";
import { getStringDate } from "../../service/utils/getStringDate";
import React from "react";
import { useMemoCard } from "../../service/memoCards/useMemoCard";
import {Deadline} from "../../ui/Icons/Deadline";

type TMemoPageHeader = {
  title?: string;
  createdTs: string;
  modifiedTime: number;
  deadline?: string;
  priority: string;
};

export const MemoPageInfo: React.FC<TMemoPageHeader> = ({
  title,
  createdTs,
  modifiedTime,
  deadline,
  priority,
}) => {
  const { renameMemoCard } = useMemoCard();

  const handleNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
    renameMemoCard(e.target.value);
  };

  return (
      <div className={styles.info}>
        <Input
          className={styles.title}
          defaultValue={title}
          onChange={handleNewName}
        />
        <div className={styles.infoGrid}>
          <span className={styles.withIcon} title="Creation date">
            <DateSort className={styles.icon} />
            {createdTs}
          </span>
          <span className={styles.withIcon}>
            <Priority
              className={classNames(styles.icon, priorityTheme.themify)}
              priority={priority}
            />
            <span>Priority: {priority}</span>
          </span>
          <span className={styles.withIcon} title="Update date">
            <UpdateDateSort className={styles.icon} />
            {getStringDate(modifiedTime)}
          </span>
          <span className={styles.withIcon} title="Update date">
            <Deadline className={styles.icon} status={deadline} />
            Deadline: {deadline ?? 'not set'}
          </span>
        </div>
      </div>
  );
};
