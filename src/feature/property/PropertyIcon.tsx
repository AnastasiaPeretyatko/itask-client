import { IconProps } from '@chakra-ui/icons';
import { useMemo } from 'react';
import { PropertyTypes } from './PropertyRegistry';
import {
  CheckboxIcon,
  ListIcon,
  NumberIcon,
  SelectIcon,
  StatusIcon,
  TextIcon,
  LinkIcon,
  DateIcon,
  PersonIcon,
  PaperClipIcon,
  PeopleIcon,
} from '@/components/assets/icon';

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
      return <TextIcon {...props} />;
    case PropertyTypes.Number:
      return <NumberIcon {...props} />;
    case PropertyTypes.Select:
      return <SelectIcon {...props} />;
    case PropertyTypes.Status:
      return <StatusIcon {...props} />;
    case PropertyTypes.Multiselect:
      return <ListIcon {...props} />;
    case PropertyTypes.Checkbox:
      return <CheckboxIcon {...props} />;
    case PropertyTypes.Url:
      return <LinkIcon {...props} />;
    // case PropertyTypes.Email:
    //   return <AddIcon {...props} />;
    // case PropertyTypes.PhoneNumber:
    //   return <PhoneIcon {...props} />;
    case PropertyTypes.Date:
      return <DateIcon {...props} />;
    case PropertyTypes.Person:
      return <PersonIcon {...props} />;
    case PropertyTypes.People:
      return <PeopleIcon {...props} />;
    case PropertyTypes.Files:
      return <PaperClipIcon {...props} />;
    default:
      return null;
    }

  }, [props, type]);

  return icon;

};

export default PropertyIcon;