import { TMemo } from "../../types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_MEMOCARD } from "./useMemoCard";

import { v4 as uuidv4 } from "uuid";
import { noop } from "../utils/noop";
import omit from "lodash/omit";

type TMemoCardsContext = {
  memoCards: TMemo[];
  addMemoCard: () => void;
  activeMemoCard: TMemo | null;
  setActiveMemoCard: (memoCard: TMemo) => void;
  updateMemoCard: (memoCard: TMemo) => void;
};

const DEFAULT_CONTEXT = {
  memoCards: [],
  addMemoCard: noop,
  activeMemoCard: null,
  setActiveMemoCard: noop,
  updateMemoCard: noop,
};

const MemoCardsContext = createContext<TMemoCardsContext>(DEFAULT_CONTEXT);

export const useMemoCards = () => useContext(MemoCardsContext);

export const MemoCardsContextProvider: React.FC = ({ children }) => {
  const memoCardsParsed =
    JSON.parse(localStorage.getItem("REMIND_APP_MEMO_CARDS") || "0") || [];
  const [memoCards, setMemoCards] = useState<TMemo[]>(memoCardsParsed);

  const [activeMemoCard, setActiveMemoCard] = useState<TMemo | null>(null);
  const addMemoCard = () => {
    const newMemoCard = {
      ...omit(DEFAULT_MEMOCARD, ["id", "createdTs"]),
      id: uuidv4(),
      createdTs: new Date().toLocaleString("en-US", {
        timeZone: "Europe/Moscow",
      }),
    };
    setMemoCards(memoCards.concat([newMemoCard]));
    setActiveMemoCard(newMemoCard);
  };

  const updateMemoCard = (memoCard: TMemo) => {
    setMemoCards(memoCards.map((e) => (e.id === memoCard.id ? memoCard : e)));
  };

  const value = {
    memoCards: memoCards,
    addMemoCard,
    activeMemoCard,
    setActiveMemoCard,
    updateMemoCard,
  };

  return (
    <MemoCardsContext.Provider value={value}>
      {children}
    </MemoCardsContext.Provider>
  );
};

export const PersistMemoCards = () => {
  const { memoCards } = useMemoCards();
  useEffect(() => {
    localStorage.setItem("REMIND_APP_MEMO_CARDS", JSON.stringify(memoCards));
  }, [memoCards]);

  return <></>;
};
