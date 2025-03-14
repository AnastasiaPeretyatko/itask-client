import React from 'react';
import propertyRegistry from './PropertyRegistry';
import { Property as PropertyType } from '@/types/property';

export type PropertyProps = {
  property: PropertyType
}

const Property = ({ property, ...props }: PropertyProps) => {

  const rest = {
    ...props,
    property,
  };

  if (!property) {
    return <span></span>;
  }

  if (propertyRegistry[property.type]) {
    const Component = propertyRegistry[property.type].component;
    const extra = propertyRegistry[property.type].extraProps || {};

    return (
      <Component
        {...rest}
        {...extra}
      />
    );
  }

  return <span></span>;
};

export default Property;