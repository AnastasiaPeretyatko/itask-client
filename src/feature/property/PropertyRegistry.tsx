import { ComponentType } from 'react';
import StatusProperty from './StatusProperty';
import TextProperty from './TextProperty';

import { Property } from '@/types/property';

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
  property: Property;
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
  // [PropertyTypes.Multiselect]: {
  //   components: Miltiselect,
  // },
  // [PropertyTypes.Checkbox]: {
  //   components: <span></span>,
  // },
  // [PropertyTypes.Select]: {
  //   components: <span></span>,
  // },
  // [PropertyTypes.Url]: {
  //   components: <span></span>,
  // },
  // [PropertyTypes.Date]: {
  //   components: <span></span>,
  // },
  // [PropertyTypes.Person]: {
  //   components: <span></span>,
  // },
  // [PropertyTypes.People]: {
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