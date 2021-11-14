import React from "react";
import { EContent, TContent, TContentList } from "../../types";
import { ContentListItem } from "../../pages/MemoPage/MemoPageContent/MemoPageContent";
import { getContentType, isValidContent } from "../../service/content/content";
import { v4 as uuidv4 } from "uuid";

import styles from "./MemoCard.module.scss";

type TMemoCardContent = { content?: TContent; expanded?: boolean; id: string };

export const MemoCardContent: React.FC<TMemoCardContent> = ({
  content,
  expanded,
  id,
}) => {
  const contentType = getContentType(content);
  if (isValidContent(content)) {
    const ContentWrapper: React.FC = ({ children }) => {
      return (
        <div
          className={
            !expanded && contentType === EContent.String
              ? styles.contentOverflow
              : styles.content
          }
        >
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
      return (
        <ContentWrapper>
          <>
            {(content as TContentList)
              .filter((e) => e.text?.trim())
              .slice(0, expanded ? content?.length : 2)
              .map((listItem, index) => (
                <ContentListItem
                  key={uuidv4()}
                  index={index}
                  id={id}
                  {...listItem}
                  readOnly={true}
                />
              ))}
          </>
        </ContentWrapper>
      );
  }
  return <></>;
};
