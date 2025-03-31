import { HStack } from '@chakra-ui/react';
import Property from '..';
import Title from './Title';
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
      <Title property={property}/>
      <Property
        property={property}
        task={task}
      />
    </HStack>
  );
};

export default PropertyLine;