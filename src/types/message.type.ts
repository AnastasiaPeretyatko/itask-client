import { UserT } from './user.type';

export type Message = {
  id: string
  thread_id: null | string,
  is_deleted: boolean,
  is_edited: boolean,
  is_important: boolean,
  parent_id: null | string,
  author_id: string,
  room_id: string,
  content: string,
  updatedAt: Date,
  createdAt: Date
  author: UserT
  parent: null | Message
  children: Message[]
}