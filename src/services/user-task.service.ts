import { http } from '.';
import { Solutions } from '@/types/task.type';

export const updateUserTask = async (id: string, data: Partial<Solutions>) => http.patch(`/user-task/${id}`, data);

export const addAnswerTask = async (data: {taskId: string, documentIds: string[], answer?: string}) =>
  http.post(`/user-task/answer`, data);

export const getAnswerTask = async (id: string, studentId?: string) => http.post(`/user-task/${id}/answer`, { studentId } );