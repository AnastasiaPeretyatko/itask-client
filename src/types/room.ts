import { Message } from './message.type';

export type Room = {
  id: string
  title: null | string,
  owner_id: string,
  is_private: boolean,
  updatedAt: Date,
  createdAt: Date,
  deletedAt: null | Date
  users: User[]
  messages: Message[]
}

export type User = {
  id: string
  email: string
  fullName: string
}