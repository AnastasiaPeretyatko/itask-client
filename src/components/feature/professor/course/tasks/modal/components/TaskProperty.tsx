import { Container, Flex, HStack } from '@chakra-ui/react';
import { PropertyType } from '../AddTask';
import DateProperty from './property/DateProperty/DateProperty';
import GroupProperty from './property/GroupProperty';
import ScoreProperty from './property/ScoreProperty';
import SemesterProperty from './property/SemesterProperty';

type Props = {
  property: PropertyType
  onChangeProperty: (property: PropertyType) => void
  readOnly?: boolean
  studentRole?: boolean
}

const TaskProperty = ({ property, onChangeProperty, readOnly, studentRole = false }: Props) => {
  const groupId = property.group && typeof property.group === 'object' ? property.group.id : property.group;
  const semesterId = property.semester && typeof property.semester === 'object' ? property.semester.id : property.semester;

  console.log({ studentRole });

  return (
    <Flex
      width={'full'}
      flexDirection={'column'}
      mb={2}
    >
      {
        !studentRole ? (
          <>
            <HStack
              width={'full'}
              gap={2}
              height={'34px'}
            >
              <Container variant={'property_title'}>Группа</Container>
              <GroupProperty
                value={property.group}
                semesterId={semesterId || ''}
                onChange={(value) => onChangeProperty({ ...property, group: value })}
                onDelete={() => onChangeProperty({ ...property, group: null })}
                readOnly={readOnly}
              />
            </HStack>
            <HStack
              gap={2}
              height={'34px'}
            >
              <Container variant={'property_title'}>Семестр</Container>
              <SemesterProperty
                value={property.semester}
                groupId={groupId || ''}
                onChange={(value) => onChangeProperty({ ...property, semester: value })}
                onDelete={() => onChangeProperty({ ...property, semester: null })}
                readOnly={readOnly}
              />
            </HStack>
          </>
        ) : null
      }
      <HStack
        gap={2}
        height={'34px'}
      >
        <Container variant={'property_title'}>Оценка</Container>
        <ScoreProperty
          value={property.score}
          onChange={(value) => onChangeProperty({ ...property, score: +value })}
          readOnly={readOnly}
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
        <Container variant={'property_title'}>Дата</Container>
        <DateProperty
          value={{ from: property.startDate, to: property.endDate }}
          onChange={(value) => onChangeProperty({ ...property, endDate: value.to, startDate: value.from })}
          readOnly={readOnly}
        />
      </HStack>
    </Flex>
  );
};

export default TaskProperty;