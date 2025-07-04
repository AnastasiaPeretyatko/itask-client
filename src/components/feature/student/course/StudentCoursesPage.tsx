import {
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from '../../professor/course/CourseCard';
import SearchInput from '@/components/ui/SearchInput';
import SelectUi from '@/components/ui/SelectUi';
import { getListSemesterFromGroup } from '@/services/semester.service';
import { AppDispatch, RootState } from '@/store';
import { getAllFromSemesterGroupThunk } from '@/store/course/course.thunk';
import { OptionType } from '@/types/course.type';

const NotFoundImage = dynamic(
  () => import('@/components/assets/animation/not-found'),
  { ssr: false },
);

const StudentCoursesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [listSemester, setListSemester] = useState<OptionType[]>([]);
  const { user } = useSelector((state: RootState) => state.user);
  const { data: courses } = useSelector((state: RootState) => state.courses);

  const fetchListSemester = async () => {
    if(!user || !user?.studentId) {return;}
    await getListSemesterFromGroup(user.studentId).then((res) =>
      setListSemester(res.data),
    );
  };

  const fetchListCourse = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const semesterId = e.target.value;
    if((!user || !user.group_id) || !semesterId) {return;}
    dispatch( getAllFromSemesterGroupThunk({ semesterId, groupId: user.group_id }) );
  };

  useEffect(() => {
    fetchListSemester();
  }, []);

  return (
    <VStack
      width="100%"
      align="start"
      padding={4}
    >
      <HStack
        width={'100%'}
        justify={'space-between'}
        mb={4}
      >
        <Heading
          size="md"
          whiteSpace={'nowrap'}
        >
          Мои курсы
        </Heading>
        <HStack>
          <SelectUi
            options={listSemester}
            onChange={fetchListCourse}
            placeholder="Выберите семестр"
          />
          <SearchInput placeholder="Поиск..." />
        </HStack>
      </HStack>
      <SimpleGrid
        width={'100%'}
        columns={{ sm: 1, md: 2, xl: 3 }}
        spacing={6}
      >
        {courses?.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
          />
        ))}
      </SimpleGrid>
      {courses && !courses.length ? (
        <Flex
          width={'100%'}
          flexDir="column"
          align="center"
          justify="center"
        >
          <NotFoundImage />
          <Heading
            fontSize={'xl'}
            fontWeight={600}
          >
            Курсы не найдены
          </Heading>
          <Text color={'gray.500'}>По вашему запросу ничего не найдено</Text>
        </Flex>
      ) : null}
    </VStack>
  );
};

export default StudentCoursesPage;
