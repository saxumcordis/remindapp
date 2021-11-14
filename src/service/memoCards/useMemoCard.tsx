import React, { createContext, useCallback, useContext, useState } from "react";
import {
  EContent,
  EMemoPriority,
  TContent,
  TContentList,
  TContentListItem,
  TMemo,
} from "../../types";

import omit from "lodash/omit";

import { NIL as NIL_UUID } from "uuid";
import { useMemoCards } from "./useMemoCards";
import { noop } from "../utils/noop";
import { getMemoCardById } from "./service";
import { switchContent } from "../content/content";
import { defaultContentListItem } from "../../components/MemoCard/MemoCard";

type TMemoCardContext = {
  memoCard: TMemo | null;
  renameMemoCard: (newTitle: string, id?: string) => void;
  pinMemoCard: (pinned: boolean, id?: string) => void;
  switchContentType: (newType: EContent, id?: string) => void;
  saveContent: (newContent: TContent, id?: string) => void;
  lastItemId: number;
  setLastItemId: (lastItemId: number) => void;
  saveContentItem: (
    newContentListItem: TContentListItem,
    index: number,
    id?: string
  ) => void;
  deleteContentItem: (index: number, id?: string) => void;
  addContentItem: (
    newContentListItem: TContentListItem,
    index: number,
    id?: string,
    shouldFocus?: boolean
  ) => void;
};

export const DEFAULT_MEMOCARD: TMemo = {
  id: NIL_UUID,
  createdTs: new Date(0).toLocaleString("en-US", { timeZone: "Europe/Moscow" }),
  modifiedTime: new Date(0).getTime(),
  title: "New Memo",
  content: "",
  priority: EMemoPriority.Low,
  deadline: undefined,
  pinned: false,
};

const DEFAULT_MEMOCARD_CONTEXT: TMemoCardContext = {
  memoCard: DEFAULT_MEMOCARD,
  lastItemId: 0,
  setLastItemId: noop,
  renameMemoCard: noop,
  pinMemoCard: noop,
  switchContentType: noop,
  saveContent: noop,
  saveContentItem: noop,
  deleteContentItem: noop,
  addContentItem: noop,
};

const MemoCardContext = createContext<TMemoCardContext>(
  DEFAULT_MEMOCARD_CONTEXT
);

export const useMemoCard = () => useContext(MemoCardContext);

export const MemoCardContextProvider: React.FC = ({ children }) => {
  const { memoCards, activeMemoCard, updateMemoCard } = useMemoCards();

  const [lastItemId, setLastItemId] = useState<number>(0);

  const renameMemoCard = useCallback(
    (newTitle: string) => {
      if (activeMemoCard) {
        updateMemoCard({
          ...{ ...omit(activeMemoCard, ["title"]), title: newTitle },
        });
      }
    },
    [activeMemoCard, updateMemoCard]
  );

  const pinMemoCard = useCallback(
    (pinned: boolean, id?: string) => {
      if (id) {
        updateMemoCard({
          ...{ ...omit(getMemoCardById(id!, memoCards), ["pinned"]), pinned },
        });
      }
    },
    [memoCards, updateMemoCard]
  );

  const switchContentType = useCallback(
    (newType: EContent, id?: string) => {
      if (id) {
        const memoCard = getMemoCardById(id!, memoCards);
        const content = switchContent(newType, memoCard?.content);
        updateMemoCard({
          ...{ ...omit(memoCard, ["content"]), content },
        });
      }
    },
    [memoCards, updateMemoCard]
  );

  const saveContent = useCallback(
    (newContent: TContent, id?: string) => {
      if (id) {
        updateMemoCard({
          ...{
            ...omit(getMemoCardById(id, memoCards), ["content"]),
            content: newContent,
          },
        });
      }
    },
    [memoCards, updateMemoCard]
  );

  const deleteContentItem = useCallback(
    (index: number, id?: string) => {
      if (id) {
        const memoCard = getMemoCardById(id, memoCards);
        const newContent = (memoCard!.content as TContentList).filter(
          (e, i) => i !== index
        );
        updateMemoCard({
          ...{
            ...omit(memoCard, ["content"]),
            content: newContent.length ? newContent : [defaultContentListItem],
          },
        });
      }
    },
    [memoCards, updateMemoCard]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const findEmptyListItemIndex = (id: string) =>
    (getMemoCardById(id, memoCards)!.content as TContentList).findIndex(
      (item) => !item.text
    );

  const addContentItem = useCallback(
    (
      newContentListItem: TContentListItem,
      index: number,
      id?: string,
      shouldFocus = true
    ) => {
      if (id) {
        const emptyListItemIndex = findEmptyListItemIndex(id);
        if (emptyListItemIndex === -1) {
          const memoCard = getMemoCardById(id, memoCards);
          (memoCard!.content as TContentList).splice(
            index + 1,
            0,
            newContentListItem
          );
          updateMemoCard({
            ...{
              ...omit(memoCard, ["content"]),
              content: memoCard!.content,
            },
          });
        }
        shouldFocus &&
          setLastItemId(
            emptyListItemIndex === -1 ? index + 1 : emptyListItemIndex
          );
      }
    },
    [findEmptyListItemIndex, memoCards, updateMemoCard]
  );

  const saveContentItem = useCallback(
    (newContentItem: TContentListItem, index: number, id?: string) => {
      if (id) {
        const memoCard = getMemoCardById(id, memoCards);
        const newContent = (memoCard!.content as TContentList).map((e, i) =>
          i === index ? newContentItem : e
        );
        updateMemoCard({
          ...{
            ...omit(memoCard, ["content"]),
            content: newContent,
          },
        });
        setLastItemId(index);
      }
    },
    [memoCards, updateMemoCard]
  );

  const value = {
    memoCard: activeMemoCard,
    renameMemoCard,
    pinMemoCard,
    switchContentType,
    saveContent,
    lastItemId,
    saveContentItem,
    deleteContentItem,
    addContentItem,
    setLastItemId,
  };

  return (
    <MemoCardContext.Provider value={value}>
      {children}
    </MemoCardContext.Provider>
  );
};
