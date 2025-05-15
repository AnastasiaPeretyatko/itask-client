import { http } from '.';

export const getAllFromSemesterGroup = (params: {[key: string]: string}) =>
  http.get('/courses/list', { params });

export const getAllByProfessor = (id: string) => http.get(`/courses/professor/${id}`);

export const getCoursesForProfessor = (id: string) => http.get(`/assignment/professor/${id}`);

//? New request
export const getOneCourse = (id: string) => http.get(`/courses/${id}`);

export const getStudentsTaskByCourse = (id: string, dto: {
  semesterId: string,
  groupId: string
}) => http.post(`/courses/${id}/students`, dto);

export const getCourseAndTasks = () => http.post('/courses/tasks');
