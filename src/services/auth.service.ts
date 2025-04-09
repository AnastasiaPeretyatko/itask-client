import { http } from '.';

export const loginRequest = (email: string, password: string) =>
  http.post('/auth', { email, password });
