import { Card, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const Task = () => {
  return (
    <Card variant={'taskSmall'}>
      <Text fontSize={'xs'}>12:00 am - 14:00 am</Text>
      <Heading size={'sm'}>Lunch with Adam</Heading>
      <Text fontSize={'sm'}>The view from the top</Text>
    </Card>
  );
};

export default Task;
