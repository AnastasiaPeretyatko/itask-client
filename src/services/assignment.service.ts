import { http } from '.';

// export const listSemestersByCourse = async (course_id: string) => http.get(`/assignment/semester/${course_id}`);

// export const listGroupsByCourse = async (course_id: string, semester_id: string) => http.get(`/assignment/${course_id}/${semester_id}`);

export const getGroupByCourse = async (course_id: string, params?: { [key: string]: string }) => http.get(`/assignment/group/${course_id}`, { params });

export const getSemesterByCourse = async (course_id: string, params?: { [key: string]: string }) => http.get(`/assignment/semester/${course_id}`, { params });