import { Container, Flex, HStack } from '@chakra-ui/react';
import DateProperty from './property/DateProperty/DateProperty';
import GroupProperty from './property/GroupProperty';
import ScoreProperty from './property/ScoreProperty';
import SemesterProperty from './property/SemesterProperty';
import { OptionType, Property } from '@/types/course.type';

type Props = {
  property: Property & {group: null | OptionType | string, semester: null | OptionType | string}
  onChangeProperty: (property: Property & {group: null | OptionType, semester: null | OptionType}) => void
  readOnly?: boolean
}

const TaskProperty = ({ property, onChangeProperty, readOnly }: Props) => {
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
          onChange={(value) => onChangeProperty({ ...property, group: value })}
          onDelete={() => onChangeProperty({ ...property, group: null })}
          readOnly={readOnly}
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
          onChange={(value) => onChangeProperty({ ...property, semester: value })}
          onDelete={() => onChangeProperty({ ...property, semester: null })}
          readOnly={readOnly}
        />
      </HStack>
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