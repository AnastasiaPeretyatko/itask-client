import { TaskModel } from './course.type';
import { DocumentType } from './document.type';

export type Solutions = {
  id: string,
  status: string,
  grade: null | number,
  o: number,
  isActive: boolean,
  task_id: string,
  student_id: string,
  createdAt: Date,
  updatedAt: Date
  comment: string | null,
  answer: null | Answer,
  creatorBy: CreateBy
  documents: DocumentType[]
}

export type Answer = {
  code: string,
  text: string
}

export type CreateBy = {
  id: string,
  fullName: string
}

export type DashboardTask = TaskModel & {
  solutions: Solutions
}

