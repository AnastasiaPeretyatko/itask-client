import { ChevronRightIcon } from '@chakra-ui/icons';
import { Card, CircularProgress, CircularProgressLabel, Heading, IconButton, Text, VStack } from '@chakra-ui/react';

const TaskItem = () => {
  return (
    <Card
      color={'white'}
      backgroundColor={'primary.purple'}
      padding={3}
      borderRadius={16}
      flexDir={'row'}
      gap={4}

    >
      <CircularProgress
        value={40}
        color="white"
        trackColor={'#cabdff54'}
      >
        <CircularProgressLabel>40%</CircularProgressLabel>
      </CircularProgress>
      <VStack
        align={'start'}
        justify={'space-between'}
        flex={1}
      >
        <Heading
          size={'sm'}
          fontWeight={500}
        >Информационные системы</Heading>
        <Text
          color={'white.100'}
          fontSize={'sm'}
        >12 задач</Text>
      </VStack>
      <IconButton
        aria-label=""
        variant={'iconButton'}
        icon={<ChevronRightIcon/>}
        onClick={() => null}
      />
    </Card>
  );
};

export default TaskItem;