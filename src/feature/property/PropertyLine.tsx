import { HStack, Text } from '@chakra-ui/react';
import PropertyIcon from './PropertyIcon';
import Property from '.';
import { PropertyModel, TaskModel } from '@/types/course.type';

type Props = {
  property: PropertyModel
  task: TaskModel
}

const PropertyLine = ({ property, task }: Props) => {
  return (
    <HStack
      gap={2}
      height={'34px'}
    >
      <HStack
        minW={'160px'}
        color={'text.pale'}
        fontSize={'sm'}
      >
        <PropertyIcon type={property.type}/>
        <Text textTransform={'capitalize'}>{property.title}</Text>
      </HStack>
      <Property
        property={property}
        task={task}

      />
    </HStack>
  );
};

export default PropertyLine;