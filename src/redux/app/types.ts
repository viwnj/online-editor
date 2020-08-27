import Filetree, { FileNode } from '../../misc/FiletreeClass';

export interface IAction {
  type: string;
  files?: Array<File>;
  filetree?: Filetree;
  fileStateObj?: FileStateObj;
  fileId: number;
}

export interface File {
  id: number;
  name: string;
  content: string;
}

export interface IState {
  files: Array<File>;
  filetree: Filetree;
  requestStatus: STATUS;
  openTabs: FileNode[];
}

export interface FileStateObj {
  id?: number;
  name?: string;
  isDirectory?: boolean;
  content?: string | undefined;
  path?: string;
  modified?: boolean;
  unsaved?: boolean;
  extension?: string;
}

export enum STATUS {
  Error = -1,
  Idle,
  Pending,
  Done,
}
