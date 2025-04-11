import { AddIcon } from '@chakra-ui/icons';
import { Container, HStack, IconButton, Tag, Text } from '@chakra-ui/react';
import CardTask from './CardTask';

const ColumnBoard = () => {
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
        <HStack>
          <Container
            width={4}
            height={4}
            border={'2px solid red'}
            borderRadius={'full'}
          />
          <Text>To-do</Text>
          <Tag>3</Tag>
        </HStack>
        <IconButton
          aria-label="add task"
          variant={'unstyled'}
          size={'sm'}
          icon={<AddIcon/>}
        />
      </HStack>
      <CardTask/>
      <CardTask/>
      <CardTask/>
      <CardTask/>
    </Container>
  );
};

export default ColumnBoard;