export type ProfessorT = {
  id: string
  user_id: string
  fullName: string
  tel: string | null
  description: string | null
  createdAt: Date
  updatedAt: Date
}

export type CourseT = {
  course: BaseCourseT
  professors: ProfessorT[]
}

export type BaseCourseT = {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}
