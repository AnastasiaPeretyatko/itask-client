export type UserT = {
  id: string
  email: string
  role: 'professor' | 'student' | 'admin'
  isActivated: boolean
  activationLink: null
  createdAt: Date
  updatedAt: Date
  groupId: null | string
  fullNmae: string
  studentId: string | null
  professorId: string | null
}
