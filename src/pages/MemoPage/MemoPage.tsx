import React from "react";

import { useMemoCards } from "../../service/memoCards/useMemoCards";
import { NotFound } from "../../components/NotFound";

import { MemoPageInfo } from "./MemoPageInfo";
import { EMemoPriorityNames } from "../../service/memoCards/service";

import styles from "./MemoPage.module.scss";
import { MemoPageControls } from "./MemoPageControls";
import { MemoPageContent } from "./MemoPageContent";

export const MemoPage: React.FC = () => {
  const { activeMemoCard } = useMemoCards();

  if (!activeMemoCard) return <NotFound />;

  const priority = EMemoPriorityNames[activeMemoCard.priority];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <MemoPageInfo
          title={activeMemoCard.title}
          createdTs={activeMemoCard.createdTs}
          modifiedTime={activeMemoCard.modifiedTime}
          priority={priority}
          deadline={activeMemoCard.deadline}
        />
        <MemoPageControls activeMemoCard={activeMemoCard} />
      </div>
      <MemoPageContent
        content={activeMemoCard.content}
        id={activeMemoCard.id}
      />
    </div>
  );
};
