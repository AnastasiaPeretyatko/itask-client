import { http } from '.';

export const createMessage = async (data: { room_id: string, content: string }) => http.post('/message', data);

export const getMessages = async (data: {room_id: string}) => http.post(`/message/all`, data);