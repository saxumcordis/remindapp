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
import { useFiltering } from "../../service/memoCards/useFiltering";
import { themifyObject } from "../../ui/Priority/priority";

type MemoCardProps = {
  memoCard: TMemo;
};

const MAX_CONTENT_LENGTH = 6;

const MAX_LIST_CONTENT_LENGTH = 2;

export const defaultContentListItem = {
  text: "",
  checked: false,
};

export const MemoCard: React.FC<MemoCardProps> = ({ memoCard }) => {
  const { setActiveMemoCard } = useMemoCards();

  const { showPriority } = useFiltering();

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
    <Link to={`memo/${memoCard.id}`}>
      <MemoCardContextProvider>
        <div
          className={classNames(styles.memoCard, {
            [styles.showPriority]: showPriority,
          })}
          style={showPriority ? themifyObject(memoCard.priority) : undefined}
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
          <MemoCardContent
            content={memoCard.content}
            expanded={expanded}
            id={memoCard.id}
          />
          {shouldShowExpander && (
            <div
              className={classNames(styles.footer, {
                [styles.rotated]: expanded,
              })}
            >
              {(isHovered || isListContent) && (
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    handleExpanded();
                  }}
                >
                  ▼
                </span>
              )}
            </div>
          )}
        </div>
      </MemoCardContextProvider>
    </Link>
  );
};
