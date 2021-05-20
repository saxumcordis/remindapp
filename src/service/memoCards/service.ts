import { equals, filter, where } from "ramda";

export const getPinnedMemoCards = filter(where({ pinned: equals(true) }));

export const getUnPinnedMemoCards = filter(where({ pinned: equals(false) }));
