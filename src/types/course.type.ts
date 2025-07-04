export type ProfessorT = {
  id: string
  user_id: string
  fullName: string
  tel: string | null
  description: string | null
  createdAt: Date
  updatedAt: Date
}

//TODO Проверить кде используется, по возможности убрать
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

export type TCourse = {
  id: string;
  title?: string;
  name?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: TaskModel[];
  learning_form: string | null;
  language: string | null;
  assessment_system: string | null;
  access: string | null;
  tags: string[] | null;
  professors: ProfessorT[]
  // groups: Group[] //TODO нет типа
}


export type TaskModel = {
  id: string;
  title: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  assignment: TAssignment
  creatorId?: string
  courseName?: string
} & Property;

export type Property = {
  score: number | null | string;
  startDate: Date | null;
  endDate: Date | null;
  tags: string[] | null;
  priority: string | null;
  isAnswered: boolean
  group: OptionType | null | string;
  semester: OptionType | null | string
  creatorBy?: ProfessorT & {user: {
    fullName: string
    id: string
    email: string
    avatar: string
  }}
}

export type PropertyOptions = {
  id: string;
  label: string;
  color: string | null;
}

export type TAssignment = {
  courseId: string;
  professorId?: string;
  semesterId?: string
  groupId?: string
}

export type OptionType = {
  id: string;
  label: string;
  color: string | null;
}