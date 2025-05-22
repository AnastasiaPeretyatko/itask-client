import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Card, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BookIcon } from '@/components/customIcon';
import { TCourse } from '@/types/course.type';

const CourseItem = ({ course }: {course: TCourse}) => {
  const router = useRouter();

  return (
    <Card
      borderRadius={10}
      backgroundColor={'primary.purple'}
      padding={3}
      color={'white'}
      flexDir={'row'}
      gap={4}
      fontSize={'lg'}
      minW={'300px'}
      maxW={'300px'}
    >
      <Flex
        padding={3}
        backgroundColor={'#cabdff54'}
        borderRadius={12}
      >
        <BookIcon boxSize={8}/>
      </Flex>
      <VStack
        width={'full'}
        align={'start'}
      >
        <Text noOfLines={1}>{course.name}</Text>
        <HStack
          width={'full'}
          justify={'end'}
        >
          <ArrowForwardIcon
            onClick={() => router.push(`/courses/${course.id}`)}
            cursor={'pointer'}
          />
        </HStack>
      </VStack>
    </Card>
  );
};

export default CourseItem;