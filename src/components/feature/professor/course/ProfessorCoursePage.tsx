import {
  Button, Heading,
  HStack, SimpleGrid, VStack,
} from '@chakra-ui/react';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from './CourseCard';
import SearchInput from '@/components/ui/SearchInput';
import { AppDispatch, RootState } from '@/store';
import { getCoursesForProfessorThunk } from '@/store/professorModule/course/course.thunk';

const filterCourse = [
  {
    name: 'Все',
    label:'all',
  },{
    name: 'Активные',
    label:'active',
  },
  {
    name: 'Завершенные',
    label:'completed',
  },
  {
    name: 'Архив',
    label:'archive',
  },
];

const ProfessorCoursePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses } = useSelector((state: RootState) => state.courseStore);
  const { user } = useSelector((state: RootState) => state.user);

  useLayoutEffect(() => {
    // TODO пока на бэке не достаем айди передаем дефолтный
    dispatch(getCoursesForProfessorThunk('783cedb0-4146-4db2-8930-4f4a5e481f47'));
  }, []);

  return (
    <VStack
      align={'start'}
      width={'full'}
    >
      <Heading size={'md'}>Мои курсы</Heading>
      <HStack
        width={'full'}
        justify={'space-between'}
      >
        <HStack
          gap={8}
          my={4}
        >
          {
            filterCourse.map((item) => (
              <Button
                key={item.name}
                variant={'filter'}
                isActive={item.label === 'all'}
              >
                {item.name}
              </Button>
            ))
          }
        </HStack>
        <SearchInput placeholder="Поиск..."/>
      </HStack>

      <SimpleGrid
        width={'full'}
        templateColumns={{ sm: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)', '2xl': 'repeat(3, 1fr)' }}
        spacing={6}
      >
        {
          courses.map((item) => (
            <CourseCard
              key={item.id}
              course={item}
            />
          ))
        }
      </SimpleGrid>
    </VStack>
  );
};

export default ProfessorCoursePage;
