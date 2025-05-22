import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Heading, HStack, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CourseItem from './CourseItem';
import ButtonUI from '@/components/ui/ButtonUI';
import { getAllFromSemesterGroup } from '@/services/course.service';
import { RootState } from '@/store';
import { TCourse } from '@/types/course.type';

const CourseList = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [ courseList, setCourseList ] = useState<TCourse[]>([]);

  useEffect(() => {
    getAllFromSemesterGroup({}).then((res) => setCourseList(res.data.data));
  }, [user?.role]);


  if(!courseList.length) {
    return null;
  }

  return (
    <VStack
      width={'full'}
      gap={4}
      overflow={'hidden'}
    >
      <HStack
        width={'full'}
        justify={'space-between'}
        overflow={'hidden'}
      >
        <Heading size={'sm'}>Курсы</Heading>
        <ButtonUI
          rightIcon={<ArrowForwardIcon/>}
          variant={'iconButton'}
          onClick={() => router.push('/courses')}
        >Больше</ButtonUI>
      </HStack>
      <HStack
        width={'full'}
        overflow={'auto'}
        paddingY={2}
      >
        {
          courseList.map((course) => (
            <CourseItem
              key={course.id}
              course={course}
            />
          ))
        }
      </HStack>
    </VStack>
  );
};

export default CourseList;