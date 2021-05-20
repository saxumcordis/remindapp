import React, { useRef, useState } from "react";

import styles from "./MemoCard.module.scss";
import { EContent, TMemo } from "../../types";

import { MemoCardHeader } from "./MemoCardHeader";
import { useMemoCards } from "../../service/memoCards/useMemoCards";
import { MemoCardContextProvider } from "../../service/memoCards/useMemoCard";
import { MemoCardContent } from "./MemoCardContent";
import { useHover } from "../../service/hooks/useHover";
import classNames from "classnames";
import { getContentType, isValidContent } from "../../service/content/content";
import { Link } from "react-router-dom";

type MemoCardProps = {
  memoCard: TMemo;
};

const MAX_CONTENT_LENGTH = 6;

const MAX_LIST_CONTENT_LENGTH = 1;

export const MemoCard: React.FC<MemoCardProps> = ({ memoCard }) => {
  const { setActiveMemoCard } = useMemoCards();

  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpanded = () => setExpanded(!expanded);

  const hoverRef = useRef(null);
  const isHovered = useHover(hoverRef);

  const handleActiveMemoCard = () => setActiveMemoCard(memoCard);

  const contentType = getContentType(memoCard.content);
  const isStringContent = contentType === EContent.String;
  const isListContent = contentType === EContent.List;

  const shouldShowExpander =
    isValidContent(memoCard.content) &&
    ((isStringContent &&
      Number(memoCard.content?.length) > MAX_CONTENT_LENGTH) ||
      (isListContent &&
        Number(memoCard.content?.length) > MAX_LIST_CONTENT_LENGTH));

  return (
    <MemoCardContextProvider>
      <div
        className={styles.memoCard}
        onClick={handleActiveMemoCard}
        ref={hoverRef}
      >
        <MemoCardHeader
          id={memoCard.id}
          createdTs={memoCard.createdTs}
          title={memoCard.title}
          pinned={memoCard.pinned}
          deadline={memoCard.deadline}
          priority={memoCard.priority}
        />
        <Link to={`memo/${memoCard.id}`}>
          <MemoCardContent content={memoCard.content} expanded={expanded} />
        </Link>
        {shouldShowExpander && (
          <div
            className={classNames(styles.footer, {
              [styles.rotated]: expanded,
            })}
          >
            {isHovered && <span onClick={handleExpanded}>▼</span>}
          </div>
        )}
      </div>
    </MemoCardContextProvider>
  );
};
