export enum EMemoPriority {
  Critical,
  Major,
  Low,
}

export enum EContent {
  String,
  List,
}

export type TContentListItem = {
  checked: boolean;
  text?: string;
};

export type TContentList = TContentListItem[];

export type TContent = string | TContentList;

export type TMemo = {
  id: string;
  createdTs: string;
  modifiedTime: number;
  title: string;
  content?: TContent;
  priority: EMemoPriority;
  deadline?: string;
  pinned: boolean;
};
