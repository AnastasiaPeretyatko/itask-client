import { http } from '.';

export const getListSemesterFromGroup = (studentId: string ) =>
  http.get(`/semesters/student/${studentId}`);