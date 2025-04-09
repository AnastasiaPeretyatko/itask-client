import { http } from '.';

export const transaction = (data: {path: string, data: any}) => http.post('/transactions', data);