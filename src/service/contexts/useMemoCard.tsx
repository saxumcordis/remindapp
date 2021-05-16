import React, { createContext, useContext, useState } from "react";
import { EContent, EMemoPriority, TContent, TMemo } from "../../types";

import { NIL as NIL_UUID } from 'uuid';

type TMemoCardContext = {
  memoCard: TMemo;
};

const DEFAULT_CONTENT: TContent = {
  checked: false,
  text: "",
};

export const DEFAULT_MEMOCARD: TMemo = {
  id: NIL_UUID,
  title: "",
  contentType: EContent.String,
  content: DEFAULT_CONTENT,
  priority: EMemoPriority.Low,
  deadline: undefined,
  pinned: false,
};

const DEFAULT_MEMOCARD_CONTEXT: TMemoCardContext = {
  memoCard: DEFAULT_MEMOCARD,
};

const MemoCardContext = createContext<TMemoCardContext>(
  DEFAULT_MEMOCARD_CONTEXT
);

export const useMemoCard = () => useContext(MemoCardContext);

export const MemoCardContextProvider: React.FC = ({ children }) => {
  const [memoCard, setMemoCard] = useState<TMemo>();

  const value = {
    ...DEFAULT_MEMOCARD_CONTEXT,
  };

  return (
    <MemoCardContext.Provider value={value}>
      {children}
    </MemoCardContext.Provider>
  );
};
