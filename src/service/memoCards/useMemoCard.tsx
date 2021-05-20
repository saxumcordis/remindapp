import React, { createContext, useContext } from "react";
import { EMemoPriority, TMemo } from "../../types";

import omit from "lodash/omit";

import { NIL as NIL_UUID } from "uuid";
import { useMemoCards } from "./useMemoCards";
import { noop } from "../utils/noop";

type TMemoCardContext = {
  memoCard: TMemo | null;
  renameMemoCard: (newTitle: string) => void;
};

export const DEFAULT_MEMOCARD: TMemo = {
  id: NIL_UUID,
  createdTs: new Date(0).toLocaleString("en-US", { timeZone: "Europe/Moscow" }),
  title: "New Memo",
  content: "",
  priority: EMemoPriority.Low,
  deadline: undefined,
  pinned: false,
};

const DEFAULT_MEMOCARD_CONTEXT: TMemoCardContext = {
  memoCard: DEFAULT_MEMOCARD,
  renameMemoCard: noop,
};

const MemoCardContext = createContext<TMemoCardContext>(
  DEFAULT_MEMOCARD_CONTEXT
);

export const useMemoCard = () => useContext(MemoCardContext);

export const MemoCardContextProvider: React.FC = ({ children }) => {
  const { activeMemoCard, updateMemoCard } = useMemoCards();
  const renameMemoCard = (newTitle: string) => {
    if (activeMemoCard) {
      updateMemoCard({
        ...{ ...omit(activeMemoCard, ["title"]), title: newTitle },
      });
    }
  };

  const value = {
    memoCard: activeMemoCard,
    renameMemoCard,
  };

  return (
    <MemoCardContext.Provider value={value}>
      {children}
    </MemoCardContext.Provider>
  );
};
