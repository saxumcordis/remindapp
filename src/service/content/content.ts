import {
  allPass,
  always,
  any,
  anyPass,
  both,
  complement,
  cond,
  is,
  isEmpty,
  isNil,
  pipe,
  propSatisfies,
  trim,
} from "ramda";

import { EContent, TContent, TContentList } from "../../types";

export const isListContent: (v?: any) => v is TContentList = is(Array) as (
  v?: any
) => v is TContentList;

export const isTextContent: (v?: any) => v is string = is(String) as (
  v?: any
) => v is string;

export const isValidListContent: (content?: TContent) => boolean = allPass([
  isListContent,
  complement(isEmpty),
  any(propSatisfies(both(complement(isNil), complement(isEmpty)), "text")),
]);

export const isValidTextContent: (content?: TContent) => boolean = allPass([
  isTextContent,
  pipe(trim, complement(isEmpty)),
]);

export const isValidContent: (content?: TContent) => boolean = anyPass([
  isValidListContent,
  isValidTextContent,
]);

export const getContentType: (
  content?: TContent
) => EContent | undefined = cond([
  [isTextContent, always(EContent.String)],
  [isListContent, always(EContent.List)],
]);
