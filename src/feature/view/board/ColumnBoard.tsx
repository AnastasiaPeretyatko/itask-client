import { Badge, Container, HStack, Tag, Text, VStack } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import { Column } from '.';
import { DashboardTask } from '@/types/task.type';

type ColumnProps = {
  column: Column;
  tasks: DashboardTask[];
};

const ColumnBoard = ({ column, tasks }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  return (
    <Container variant={'column_board'}>
      <HStack
        width={'100%'}
        background={'button.neutral.bg'}
        borderRadius={'md'}
        paddingY={2}
        paddingX={4}
        justify={'space-between'}
        mb={2}
      >
        <HStack width={'full'}>
          <Container
            minWidth={3}
            height={3}
            border={'2px solid'}
            borderColor={'button.neutral.border'}
            borderRadius={'full'}
          />
          <Badge colorScheme={column.color}>{column.title}</Badge>
          {/* <Text
            whiteSpace={'nowrap'}
            width={'full'}
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            display={'inline-flex'}
            flex={1}
          >{column.title}</Text> */}
          <Tag>{tasks.length}</Tag>
        </HStack>
      </HStack>
      <VStack
        ref={setNodeRef}
        height={'100%'}
      >
        {
          tasks.map((task) => {
            return (
              <TaskCard
                key={task.id}
                task={task}
              />
            );
          })
        }
      </VStack>
    </Container>
  );
};

export default ColumnBoard;