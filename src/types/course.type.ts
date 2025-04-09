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
}


export type TaskModel = {
  id: string;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  assignment?: TAssignment
  creatorId?: string
} & Property;

export type Property = {
  score: number | null;
  startDate: Date | null;
  endDate: Date | null;
  tags: string[] | null;
  priority: string | null;
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
}