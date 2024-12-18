export type CourseT = {
  id: string
  semesterGroupId: string
  courseId: string
  createdAt: Date
  updatedAt: Date
  course_id: string
  semester_group_id: string
  course: {
    id: string
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
  }
  semesterGroup: {
    id: string
    semesterId: string
    groupId: string
    createdAt: Date
    updatedAt: Date
    semester_id: string
    group_id: string
  }
}
