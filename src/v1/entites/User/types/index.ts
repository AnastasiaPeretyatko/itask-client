export type UserType = {
  id: string
  email: string
  role: UserRole
  isActivated: boolean
  activationLink: null
  createdAt: Date
  updatedAt: Date
  group_id: null | string
  fullName: string
  studentId: string | null
  professorId: string | null
}

export enum UserRole {
  Professor = 'professor',
  Student = 'student',
  Admin = 'admin',
}