import { PropertyTypes } from '@/feature/property/PropertyRegistry';

export type Property = {
  id: string
  type: PropertyTypes,
  title: string
  value: string | any[] | null
}