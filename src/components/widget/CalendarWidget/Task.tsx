import { Card, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { DashboardTask } from '@/types/task.type';

type Props = {
  task: DashboardTask
}

const Task = ({ task }: Props) => {
  return (
    <Card variant={'taskSmall'}>
      <Text fontSize={'sm'}>
        {task.startDate ? <span>{new Date(task.startDate).toLocaleDateString()}</span> : null} ⇾
        {task.endDate ? <span>{new Date(task.endDate).toLocaleDateString()}</span> : null}
      </Text>
      <Heading fontSize={'sm'}>{task.title}</Heading>
      <Text
        fontSize={'sm'}
        noOfLines={2}
      >{task.text}</Text>
    </Card>
  );
};

export default Task;
