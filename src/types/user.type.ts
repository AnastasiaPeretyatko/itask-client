export type UserT = {
  id: string
  email: string
  role: UserRole
  isActivated: boolean
  activationLink: null
  createdAt: Date
  updatedAt: Date
  groupId: null | string
  fullNmae: string
  studentId: string | null
  professorId: string | null
}

export enum UserRole {
  Professor = 'professor',
  Student = 'student',
  Admin = 'admin',
}
