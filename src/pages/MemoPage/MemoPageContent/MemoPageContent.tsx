import React, { createRef, useCallback } from "react";
import {
  EContent,
  TContent,
  TContentList,
  TContentListItem,
} from "../../../types";
import { v4 as uuidv4 } from "uuid";

import styles from "./MemoPageContent.module.scss";
import { useMemoCard } from "../../../service/memoCards/useMemoCard";
import {
  getContentType,
  isValidContent,
} from "../../../service/content/content";
import { Input } from "../../../components/Input";
import { Checkbox } from "../../../components/Checkbox";
import classNames from "classnames";
import {Cross} from "../../../ui/Icons/Cross";
import {useOnEnter} from "../../../service/content/useOnEnter";
import {defaultContentListItem} from "../../../components/MemoCard/MemoCard";

type Props = {
  content?: TContent;
  id: string;
};

const ContentListItem: React.FC<TContentListItem & { index: number, id: string }> = ({
    id,
  text,
  checked,
  index,
}) => {
  const {saveContentItem, deleteContentItem, lastItemId, setLastItemId, addContentItem} = useMemoCard();

  const checkboxRef = createRef<HTMLInputElement>();

  const handleCheck = useCallback(() => {
    saveContentItem({text, checked: checkboxRef?.current?.checked || false}, index, id)
  }, [saveContentItem, text, checkboxRef, index, id]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value)
    saveContentItem({text: e.target.value, checked}, index, id)
  }

  const onEnter = useOnEnter(() => addContentItem(defaultContentListItem, index, id))

  return (
    <div className={styles.listItem}>
      {Boolean(text) && (
        <Checkbox
          className={styles.checkbox}
          ref={checkboxRef}
          onChange={handleCheck}
          defaultChecked={checked}
        />
      )}
      <Input
        className={classNames(styles.listItemInput, {
          [styles.checked]: checked,
        })}
        defaultValue={text}
        onChange={handleTextChange}
        autoFocus={lastItemId === index}
        onKeyDown={onEnter}
        onFocus={() => setLastItemId(index)}
        placeholder={'Write your memo here to not forget'}
      />
      {Boolean(text) && <Cross className={styles.delete} onClick={() => deleteContentItem(index, id)} />}
    </div>
  );
};

export const MemoPageContent: React.FC<Props> = ({ content, id }) => {
  const { saveContent } = useMemoCard();

  const contentType = getContentType(content);
  const isListContent = contentType === EContent.List;

  const handleContentTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newContent = e.target.value;
    if (isValidContent(newContent)) {
      saveContent(newContent, id);
    }
  };

  if (isListContent) {
    return (
      <div className={styles.contentField}>
        {(content as TContentList).map((e, i) => (
          <ContentListItem {...e} key={uuidv4()} index={i} id={id} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.contentField}>
      <textarea
        className={styles.textArea}
        defaultValue={content as string}
        onChange={handleContentTextChange}
        placeholder={'Write your memo here to not forget'}
      />
    </div>
  );
};
