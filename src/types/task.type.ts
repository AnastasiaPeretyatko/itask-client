export type UserTask = {
  id: string,
  status: string,
  grade: null | number,
  o: number,
  isActive: boolean,
  answer: null | string,
  task_id: string,
  student_id: string,
  createdAt: Date,
  updatedAt: Date
}