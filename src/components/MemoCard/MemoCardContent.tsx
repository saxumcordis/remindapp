import React from "react";
import { EContent, TContent } from "../../types";
import { getContentType, isValidContent } from "../../service/content/content";

import styles from "./MemoCard.module.scss";

type TMemoCardContent = { content?: TContent; expanded?: boolean };

export const MemoCardContent: React.FC<TMemoCardContent> = ({
  content,
  expanded,
}) => {
  const contentType = getContentType(content);
  if (isValidContent(content)) {
    const ContentWrapper: React.FC = ({ children }) => {
      return (
        <div className={!expanded ? styles.contentOverflow : styles.content}>
          {children}
        </div>
      );
    };
    if (contentType === EContent.String)
      return (
        <ContentWrapper>
          {expanded ? content : content!.slice(0, 12)}
        </ContentWrapper>
      );
    else if (contentType === EContent.List)
      return <ContentWrapper>LIST</ContentWrapper>;
  }
  return <></>;
};
