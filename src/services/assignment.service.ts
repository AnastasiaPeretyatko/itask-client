import { http } from '.';

export const listSemesters = async (course_id: string) => http.get(`/assignment/semester/${course_id}`);

export const listGroups = async (course_id: string, semester_id: string) => http.get(`/assignment/group/${course_id}/${semester_id}`);