import { http } from '.';

export const createMessage = async (data: { id?: string, content: string, task_id?: string, parent_id?: string }) => http.post('/message', data);

export const getMessages = async (data: {id?: string, task_id?: string}) => http.post(`/message/all`, data);