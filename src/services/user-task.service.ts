import { http } from '.';
import { UserTask } from '@/types/task.type';

export const updateUserTask = async (id: string, data: Partial<UserTask>) => http.patch(`/user-task/${id}`, data);

export const addAnswerTask = async (data: {taskId: string, documentIds: string[], answer: string}) =>
  http.post(`/user-task/answer`, data);