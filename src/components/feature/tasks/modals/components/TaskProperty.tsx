import { Flex } from '@chakra-ui/react';
import CheckboxProperty from './property/CheckboxProperty';
import DateProperty from './property/DateProperty/DateProperty';
import GroupProperty from './property/GroupProperty';
import ScoreProperty from './property/ScoreProperty';
import SemesterProperty from './property/SemesterProperty';
import WrapperProperty from './property/WrapperProperty';
import { CreateTask } from '@/store/task/task.slice';
import { OptionType } from '@/types/course.type';

type Props = {
  property: CreateTask['property']
  onChangeProperty?: (value: { [key: string]: string | OptionType | null | boolean | number | Date}) => void
  readOnly?: boolean
  studentRole?: boolean
}

const TaskProperty = ({ property, onChangeProperty, readOnly, studentRole = false }: Props) => {
  const groupId = !studentRole ? property.group && typeof property.group === 'object' ? property.group.id : property.group : null;
  const semesterId = !studentRole ? property.semester && typeof property.semester === 'object' ? property.semester.id : property.semester : null;

  const renderProperty = (name: string) => {
    switch (name){
    case 'Группа':
      return (
        <GroupProperty
          value={property.group}
          semesterId={semesterId}
          onChange={(value) => onChangeProperty?.({ group: value })}
          onDelete={() => onChangeProperty?.({ group: null })}
          readOnly={readOnly}
        />
      );
    case 'Семестр':
      return (
        <SemesterProperty
          value={property.semester}
          groupId={groupId || ''}
          onChange={(value) => onChangeProperty?.({ semester: value })}
          onDelete={() => onChangeProperty?.({ semester: null })}
          readOnly={readOnly}
        />
      );
    case 'Оценка':
      return (
        <ScoreProperty
          value={property.score}
          onChange={(value) => onChangeProperty?.({ score: +value })}
          readOnly={readOnly}
        />
      );
    case 'Ответ':
      return (
        <CheckboxProperty
          value={property.isAnswered}
          onChenge={(value) => onChangeProperty?.({ isAnswered: value })}
        />
      );
    case 'Дата':
      return (
        <DateProperty
          value={{ from: property.startDate, to: property.endDate }}
          onChange={(value) => onChangeProperty?.({ endDate: value.to, startDate: value.from })}
          readOnly={readOnly}
        />
      );
    }
  };

  return (
    <Flex
      width={'full'}
      flexDirection={'column'}
      mb={2}
    >
      {
        !studentRole ? (
          <>
            <WrapperProperty title="Группа">{renderProperty('Группа')}</WrapperProperty>
            <WrapperProperty title="Семестр">{renderProperty('Семестр')}</WrapperProperty>
          </>
        ) : null
      }
      <WrapperProperty title="Оценка">{renderProperty('Оценка')}</WrapperProperty>
      {!studentRole ? <WrapperProperty title="Ответ">{renderProperty('Ответ')}</WrapperProperty> : null}
      <WrapperProperty title="Дата">{renderProperty('Дата')}</WrapperProperty>

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
    </Flex>
  );
};

export default TaskProperty;