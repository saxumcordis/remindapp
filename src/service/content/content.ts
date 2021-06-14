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

export const getContentType: (content?: TContent) => EContent | undefined =
  cond([
    [isTextContent, always(EContent.String)],
    [isListContent, always(EContent.List)],
  ]);

export const listContentFromString = (content?: string): TContentList => {
  if (!content) return [{ text: "", checked: false }];
  return content
    .split("\n")
    .filter((e) => e)
    .map((e) => ({ text: e.trim(), checked: false }));
};

export const stringContentFromList = (content?: TContentList): string => {
  if (!content?.length) return "";
  return content.map((e) => e.text).join("\n");
};

export const switchContent = (newType: EContent, content?: TContent) => {
  switch (newType) {
    case EContent.String:
      return stringContentFromList((content || []) as TContentList);
    case EContent.List:
      return listContentFromString((content || "") as string);
    default:
      return "";
  }
};
