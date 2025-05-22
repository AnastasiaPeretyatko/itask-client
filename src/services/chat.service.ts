import { http } from '.';

export const createRoom = async (data: {userIds: string[], title?: string}) => http.post('/room', data);

export const getAllRoom = async () => http.get('/room/all');

export const deleteUserFromRoom = async (data: {roomId: string, userId: string}) => http.post(`/room/delete.user-room`, data);

export const deleteRoom = async (data: {roomId: string}) => http.post(`/room/delete`, data);

export const getUserForRoom = async () => http.get(`/users`);

// export
