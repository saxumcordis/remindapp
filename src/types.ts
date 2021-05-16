export enum EMemoPriority {
  Critical = "Critical",
  Major = "Major",
  Low = "Low",
}

export enum EContent {
  String,
  List,
}

export type TContent = {
  checked: boolean;
  text?: string;
};

export type TMemo = {
  id: string;
  title?: string;
  contentType?: EContent;
  content?: TContent | TContent[];
  priority: EMemoPriority;
  deadline?: string;
  pinned?: boolean;
};
