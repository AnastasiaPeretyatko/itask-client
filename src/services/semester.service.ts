import { http } from '.';

export const getListSemesterFromGroup = (groupId: string) =>
  http.get(`/semesters/name/${groupId}`);