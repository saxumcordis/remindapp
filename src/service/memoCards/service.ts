import { equals, filter, where, find, propEq } from "ramda";
import { TMemo } from "../../types";

export const getPinnedMemoCards = filter(where({ pinned: equals(true) }));

export const getUnPinnedMemoCards = filter(where({ pinned: equals(false) }));

export const sortByPinned = (memoCards: TMemo[]) =>
  getPinnedMemoCards(memoCards).concat(getUnPinnedMemoCards(memoCards));

export const getMemoCardById = (id: string, memoCards: TMemo[]) =>
  find(propEq("id", id), memoCards);
