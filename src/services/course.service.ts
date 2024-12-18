import { http } from '.'

export const getAllFromSemesterGroup = (semesterId: string, groupId: string) =>
  http.get(`/courses/${semesterId}/${groupId}`)
