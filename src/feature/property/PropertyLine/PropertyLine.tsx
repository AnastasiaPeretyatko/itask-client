import { HStack } from '@chakra-ui/react';
import Property from '..';
import Title from './Title';
import { PropertyModel, TaskModel } from '@/types/course.type';

type Props = {
  property: PropertyModel
  task: TaskModel
  readOnly?: boolean
}

const PropertyLine = ({ property, task, readOnly }: Props) => {
  return (
    <HStack
      gap={2}
      height={'34px'}
    >
      <Title property={property}/>
      <Property
        property={property}
        task={task}
        mode="property"
        readOnly={readOnly}
      />
    </HStack>
  );
};

export default PropertyLine;