import { http } from '.';

export const listSemestersByCourse = async (course_id: string) => http.get(`/assignment/semester/${course_id}`);

export const listGroupsByCourse = async (course_id: string, semester_id: string) => http.get(`/assignment/${course_id}/${semester_id}`);