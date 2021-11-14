import { equals, filter, find, propEq, sort, where } from "ramda";
import { EMemoPriority, TMemo } from "../../types";
import { EFilter, EFilterOrder } from "./useFiltering";

export const EMemoPriorityNames = {
  [EMemoPriority.Critical]: "Critical",
  [EMemoPriority.Major]: "Major",
  [EMemoPriority.Low]: "Low",
};

export const getPinnedMemoCards = filter(where({ pinned: equals(true) }));

export const getUnPinnedMemoCards = filter(where({ pinned: equals(false) }));

export const sortByCreatedTs = (memoCards: TMemo[]) =>
  memoCards.sort(
    (a, b) => new Date(b.createdTs).getTime() - new Date(a.createdTs).getTime()
  );

export const sortByDeadline = (memoCards: TMemo[]) =>
  memoCards.sort(
    (a, b) =>
      new Date(b.deadline ?? "").getTime() -
      new Date(a.deadline ?? "").getTime()
  );

export const sortByModifiedTime = (memoCards: TMemo[]) =>
  memoCards.sort((a, b) => b.modifiedTime - a.modifiedTime);

export const sortByField = (memoCards: TMemo[], field: EFilter) => {
  if (field === EFilter.createdTs) return sortByCreatedTs(memoCards);
  else if (field === EFilter.deadline) return sortByDeadline(memoCards);
  else if (field === EFilter.modifiedTime) return sortByModifiedTime(memoCards);
  else if (field === EFilter.title)
    return sort((a: TMemo, b) => b.title.localeCompare(a.title), memoCards);
  else if (field === EFilter.priority)
    return memoCards.sort((a, b) => a.priority - b.priority);
  return memoCards;
};

export const sortByOrder = (memoCards: TMemo[], order: EFilterOrder) =>
  order === EFilterOrder.ASC ? memoCards.reverse() : memoCards;

export const getMemoCardById = (id: string, memoCards: TMemo[]) =>
  find(propEq("id", id), memoCards);
