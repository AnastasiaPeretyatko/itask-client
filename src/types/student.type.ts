import { TaskModel } from './course.type';
import { UserTask } from './task.type';

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

export type StudentTask = {
    task: {
      task: TaskModel,
      user_task: UserTask
    }[]
  } & StudentT & {
    totalGrade: string | number
  }