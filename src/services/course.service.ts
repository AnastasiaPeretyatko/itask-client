import { http } from '.';

export const getAllFromSemesterGroup = (semesterId: string, groupId: string) =>
  http.get(`/courses/${semesterId}/${groupId}`);

export const getAllByProfessor = (id: string) => http.get(`/courses/professor/${id}`);

export const getCoursesForProfessor = (id: string) => http.get(`/assignment/professor/${id}`);

//? New request
export const getOneCourse = (id: string) => http.get(`/courses/${id}`);

export const getStudentsTaskByCourse = (id: string, params: {
  semesterId: string,
  groupId: string
}) => http.get(`/courses/${id}/students`, { params });
