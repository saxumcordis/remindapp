import React, { createContext, useCallback, useContext } from "react";
import { EContent, EMemoPriority, TContent, TMemo } from "../../types";

import omit from "lodash/omit";

import { NIL as NIL_UUID } from "uuid";
import { useMemoCards } from "./useMemoCards";
import { noop } from "../utils/noop";
import { getMemoCardById } from "./service";
import { switchContent } from "../content/content";

type TMemoCardContext = {
  memoCard: TMemo | null;
  renameMemoCard: (newTitle: string, id?: string) => void;
  pinMemoCard: (pinned: boolean, id?: string) => void;
  switchContentType: (newType: EContent, id?: string) => void;
  saveContent: (newContent: TContent, id?: string) => void;
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
  renameMemoCard: noop,
  pinMemoCard: noop,
  switchContentType: noop,
  saveContent: noop,
};

const MemoCardContext = createContext<TMemoCardContext>(
  DEFAULT_MEMOCARD_CONTEXT
);

export const useMemoCard = () => useContext(MemoCardContext);

export const MemoCardContextProvider: React.FC = ({ children }) => {
  const { memoCards, activeMemoCard, updateMemoCard } = useMemoCards();
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

  const value = {
    memoCard: activeMemoCard,
    renameMemoCard,
    pinMemoCard,
    switchContentType,
    saveContent,
  };

  return (
    <MemoCardContext.Provider value={value}>
      {children}
    </MemoCardContext.Provider>
  );
};
