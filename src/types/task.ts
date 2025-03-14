import { Property } from './property';

export type Task = {
  properties: Property[]
  id: string
  title: string
  description: string
}