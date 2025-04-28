import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Heading, HStack, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CourseItem from './CourseItem';
import ButtonUI from '@/components/ui/ButtonUI';

const CourseList = () => {
  const router = useRouter();
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
        <CourseItem/>
        <CourseItem/>
        <CourseItem/>
        <CourseItem/>
        <CourseItem/>
        <CourseItem/>

      </HStack>

    </VStack>
  );
};

export default CourseList;