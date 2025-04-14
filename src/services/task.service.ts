import { http } from '.';
import { TaskModel, TAssignment } from '@/types/course.type';

export const createTaskRequest = (data: {task: Partial<TaskModel>, assignment: TAssignment}) => http.post('/tasks', data);

export const getAllTaskRequest = (courseId: string) => http.get(`/tasks`, { params: { courseId } });

export const getStudentsAndTask = (id: string, params?: { [key: string]: string }) => http.get(`/courses/${id}`, { params });

//For Student
export const getTaskByStudent = (id: string, params?: { [key: string]: string }) => http.get(`/tasks/student/${id}`, { params });

export const updateTaskStatus = (id: string, status: string) => http.patch(`/tasks/user_task/${id}`, { status });