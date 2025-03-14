import { AddIcon, IconProps } from '@chakra-ui/icons';
import { useMemo } from 'react';
import { PropertyTypes } from './PropertyRegistry';

type PropertyIconProps = {
  type: string
} & IconProps

const PropertyIcon = ({ type, ...props }: PropertyIconProps) => {
  const icon = useMemo(() => {
    // const props = {
    //   light,
    //   black,
    //   color,
    //   size,
    //   theme,
    // };
    switch (type) {
    case PropertyTypes.Text:
      return <AddIcon {...props} />;
    case PropertyTypes.Number:
      return <AddIcon {...props} />;
    case PropertyTypes.Select:
      return <AddIcon {...props} />;
    case PropertyTypes.Status:
      return <AddIcon {...props} />;
    case PropertyTypes.Multiselect:
      return <AddIcon {...props} />;
    case PropertyTypes.Checkbox:
      return <AddIcon {...props} />;
    case PropertyTypes.Url:
      return <AddIcon {...props} />;
    // case PropertyTypes.Email:
    //   return <AddIcon {...props} />;
    // case PropertyTypes.PhoneNumber:
    //   return <PhoneIcon {...props} />;
    case PropertyTypes.Date:
      return <AddIcon {...props} />;
    case PropertyTypes.Person:
      return <AddIcon {...props} />;
    case PropertyTypes.People:
      return <AddIcon {...props} />;
    case PropertyTypes.Files:
      return <AddIcon {...props} />;
    default:
      return null;
    }

  }, [props, type]);

  return icon;

};

export default PropertyIcon;