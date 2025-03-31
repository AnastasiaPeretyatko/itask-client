import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Avatar, Box, Card, CircularProgress, CircularProgressLabel, Collapse, Grid, HStack, IconButton, Text, useDisclosure, VStack } from '@chakra-ui/react';

const StudentTaskRow = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Card
      width={'full'}
      cursor={'pointer'}
      onClick={onToggle}
    >
      <HStack
        justify={'space-between'}
        padding={3}
      >
        <HStack width={'40%'}>
          <Avatar size={'xs'}/>
          <Text size={'sm'}>Вася Пупкин</Text>
        </HStack>
        <HStack>
          <CircularProgress
            value={40}
            size={'30px'}
            color="green.400"
          >
            <CircularProgressLabel fontSize={'10px'}>40%</CircularProgressLabel>
          </CircularProgress>
          <IconButton
            aria-label="unwrap"
            variant={'unstyled'}
            size={'sm'}
            icon={isOpen ? <ChevronUpIcon boxSize={5}/> : <ChevronDownIcon boxSize={5}/>}
          />
        </HStack>
      </HStack>
      <Collapse
        in={isOpen}
        animateOpacity
        unmountOnExit
      >
        <VStack
          width={'full'}
          padding={3}
          borderTop={'1px solid'}
          borderColor={'divider'}
        >
          <HStack
            width={'full'}
            fontSize={'xs'}
            color={'text.pale'}
          >
            <Box width={'40%'}>Название</Box>
            <Grid
              width={'60%'}
              templateColumns={'repeat(3, 1fr)'}
            >
              <Box>Дата</Box>
              <Box>Оценка</Box>
              <Box>Статус</Box>
            </Grid>
          </HStack>
          <Task/>
        </VStack>
      </Collapse>
    </Card>
  );
};

const Task = () => {
  return (
    <HStack
      width={'full'}
      color={'text.secondary'}
      fontSize={'sm'}
    >
      <Box width={'40%'}>Лабораторная работа 1</Box>
      <Grid
        width={'60%'}
        templateColumns={'repeat(3, 1fr)'}
      >
        <Box>Дата</Box>
        <Box>Оценка</Box>
        <Box>Статус</Box>
      </Grid>
    </HStack>
  );
};

export default StudentTaskRow;