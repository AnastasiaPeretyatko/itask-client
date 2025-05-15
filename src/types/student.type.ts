import { DashboardTask } from './task.type';

export type StudentT = {
  id: string
  user_id: string
  group_id: string
  fullName: string
  tel: string | null
  description: string | null
  createdAt: Date
  updatedAt: Date
}

export type StudentTask = StudentT & {
  totalScore: string | null;
  tasks: DashboardTask[]
}