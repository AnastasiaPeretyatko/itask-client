import { DateRange } from 'react-day-picker';
import { PropertyTypes } from '@/feature/property/PropertyRegistry';

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
  properties: PropertyModel[];
  tasks: TaskModel[];
}

export type PropertyModel = {
  id: string;
  title: string;
  type: PropertyTypes;
  options?: PropertyOptions[];
  o: number;
  visible: boolean;
}

export type PropertyValues = string | number | string[] | undefined | boolean | null | Date | DateRange;

export type TaskModel = {
  id: string;
  title: string;
  description: string;
  values: {[id: string]: PropertyValues}
  createdAt?: Date;
  updatedAt?: Date;
  assignment?: TAssignment
  creatorId?: string
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