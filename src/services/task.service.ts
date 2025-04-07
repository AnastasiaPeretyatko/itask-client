import { http } from '.';
import { TaskModel, TAssignment } from '@/types/course.type';

export const createTaskRequest = (data: {task: TaskModel, assignment: TAssignment}) => http.post('/tasks', data);

export const getAllTaskRequest = (courseId: string) => http.get(`/tasks`, { params: { courseId } });