import { atom } from "jotai";
import { JSONContent, type Range } from "@tiptap/core";
import { WebSocketStatus } from "@hocuspocus/provider";
import { defaultValue } from "./userInfo";
import { DocumentRoom } from "./documentClass";

export interface DocumentI {
  id: string, 
  title: string, 
  document: ArrayBuffer
}

export const queryAtom = atom("");
export const rangeAtom = atom<Range | null>(null); 
export const connectionStatusAtom = atom<WebSocketStatus>(WebSocketStatus.Disconnected);
export const documentAtom = atom<DocumentI | null>(null);
export const defaultContentAtom = atom<JSONContent>(defaultValue);
export const allDocumentsAtom = atom<DocumentI[] | null>(null);
export const providerAtom = atom<DocumentRoom | null>(null);