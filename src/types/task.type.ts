import { TaskModel } from './course.type';

export type UserTask = {
  id: string,
  status: string,
  grade: null | number,
  o: number,
  isActive: boolean,
  answer: null | {
    code: string,
    text: string
  },
  task_id: string,
  student_id: string,
  createdAt: Date,
  updatedAt: Date
  creatorBy: {
    id: string,
    fullName: string
  }
}

export type DashboardTask = {
  user_task: UserTask
} & TaskModel