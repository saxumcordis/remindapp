import { TMemo } from "../../types";
import React, { createContext, useContext, useState } from "react";
import {DEFAULT_MEMOCARD} from "./useMemoCard";

import {v4 as uuidv4} from "uuid";
import {noop} from "../utils/noop";

type TMemoCardsContext = {
  memoCards: TMemo[];
  addMemoCard: () => void;
};

const DEFAULT_CONTEXT = {
  memoCards: [],
  addMemoCard: noop,
}

const MemoCardsContext = createContext<TMemoCardsContext>(DEFAULT_CONTEXT);

export const useMemoCards = () => useContext(MemoCardsContext);

export const MemoCardsContextProvider: React.FC = ({ children }) => {

  const [memoCards, setMemoCards] = useState<TMemo[]>([]);

  const addMemoCard = () => setMemoCards(memoCards.concat([{...DEFAULT_MEMOCARD, id: uuidv4(), title: "privet"}]))

  const value = {
    memoCards: memoCards,
    addMemoCard,
  };

  return (
    <MemoCardsContext.Provider value={value}>
      {children}
    </MemoCardsContext.Provider>
  );
};
