import { UserType } from '../../User/types';

export type DocumentType = {
  id: string;
  title: string;
  creatorId: string;
  parentId: null | string;
  path: string | null;
  type: string;
  context: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
  children?: DocumentType[]
  parent?: DocumentType
  creator: UserType
};