import { Container, Flex, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import DateProperty from './property/DateProperty/DateProperty';
import GroupProperty from './property/GroupProperty';
import ScoreProperty from './property/ScoreProperty';
import SemesterProperty from './property/SemesterProperty';

const TaskProperty = () => {
  const [property, setProperty] = useState({
    group: null,
    semester: null,
    score: '',
    priority: '',
    tags: '',
    deadline: null,
  });

  return (
    <Flex
      width={'full'}
      flexDirection={'column'}
      mb={2}
    >
      <HStack
        width={'full'}
        gap={2}
        height={'34px'}
      >
        <Container variant={'property_title'}>Группа</Container>
        <GroupProperty
          value={property.group}
          onChange={(value) => setProperty((prev) => ({ ...prev, group: value }))}
          onDelete={() => setProperty((prev) => ({ ...prev, group: null }))}
        />
      </HStack>
      <HStack
        gap={2}
        height={'34px'}
      >
        <Container variant={'property_title'}>
        Семестр
        </Container>
        <SemesterProperty
          value={property.semester}
          groupId={property.group?.id || ''}
          onChange={(value) => setProperty((prev) => ({ ...prev, semester: value }))}
          onDelete={() => setProperty((prev) => ({ ...prev, semester: null }))}
        />
      </HStack>
      <HStack
        gap={2}
        height={'34px'}
      >
        <Container variant={'property_title'}>Оценка</Container>
        <ScoreProperty
          value={property.score}
          onChange={(value) => setProperty((prev) => ({ ...prev, score: value }))}
        />
      </HStack>
      {/* <HStack
        gap={2}
        height={'34px'}
      >
        <Container variant={'property_title'}>
        Приоритет
        </Container>
        <Container variant={'property_modal'}></Container>
      </HStack>
      <HStack
        gap={2}
        height={'34px'}
      >
        <Container variant={'property_title'}>
        Теги
        </Container>
        <Container variant={'property_modal'}></Container>
      </HStack> */}
      <HStack
        gap={2}
        height={'34px'}
      >
        <Container variant={'property_title'}>
        Дата
        </Container>
        <DateProperty
          value={property.deadline}
          onChange={(value) => setProperty((prev) => ({ ...prev, deadline: value }))}
        />
        {/* <Container variant={'property_modal'}>

        </Container> */}
      </HStack>
    </Flex>
  );
};

export default TaskProperty;