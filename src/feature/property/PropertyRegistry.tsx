import { ComponentType } from 'react';
import CheckboxProperty from './CheckboxProperty';
import PeopleProperty from './PeopleProperty/PeopleProperty';
import SelectProperty from './SelectProperty';
import StatusProperty from './StatusProperty';
import TextProperty from './TextProperty';
import { PropertyModel, PropertyValues, TaskModel } from '@/types/course.type';

export enum PropertyTypes {
  Text = 'text',
  Number = 'number',
  Select = 'select',
  Multiselect = 'multi_select',
  Checkbox = 'checkbox',
  Url = 'url',
  Date = 'date',
  Person = 'person',
  People = 'people',
  Files = 'files',
  Status = 'status',
}

export type PropertyRegistryItemType = {
  component: ComponentType<PropertySettingsProps>;
  extraProps?: unknown;
  settings?: React.FC<PropertySettingsProps>;
};

export type PropertyRegistryType = Record<string, PropertyRegistryItemType>;


export type PropertySettingsProps = {
  property: PropertyModel;
  task: TaskModel;
  onChange: (value: PropertyValues) => void;
  // mode?: 'viewProperty' | 'property';
};

const propertyRegistry: PropertyRegistryType = {
  [PropertyTypes.Text]: {
    component: TextProperty,
  },
  [PropertyTypes.Number]: {
    component: TextProperty,
    extraProps: { type: 'number' },
  },
  [PropertyTypes.Select]: {
    component: SelectProperty,
    extraProps: { multiselect: false },
  },
  [PropertyTypes.Multiselect]: {
    component: SelectProperty,
    extraProps: { multiselect: true },
  },
  [PropertyTypes.Checkbox]: {
    component: CheckboxProperty,
  },
  [PropertyTypes.Person]: {
    component: PeopleProperty,
  },
  [PropertyTypes.People]: {
    component: PeopleProperty,
    extraProps: { multiselect: true },
  },
  // [PropertyTypes.Url]: {
  //   components: <span></span>,
  // },
  // [PropertyTypes.Date]: {
  //   components: <span></span>,
  // },
  // [PropertyTypes.Files]: {
  //   components: <span></span>,
  // },
  [PropertyTypes.Status]: {
    component: StatusProperty,
  },
};

export default propertyRegistry;