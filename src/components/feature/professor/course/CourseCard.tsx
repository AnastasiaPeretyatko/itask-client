import { ChevronRightIcon } from '@chakra-ui/icons';
import { Card, Heading, HStack, IconButton, Image, Tag, Text, VStack, Wrap } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TCourse } from '@/types/course.type';

type Props = {
  course: TCourse
}

const CourseCard = ({ course }: Props) => {
  const router = useRouter();

  return (
    <Card
      direction={'row'}
      height={'200px'}
      padding={3}
      borderRadius={'2xl'}
      gap={3}
    >
      <Image
        objectFit={'cover'}
        src="/course.webp"
        height="100%"
        borderRadius={'xl'}
      />
      <VStack
        width={'full'}
        align={'start'}
        padding={2}
        gap={1}
      >
        <Heading
          size="md"
          noOfLines={2}
        >
          {course.name}
        </Heading>
        <Wrap>
          <Tag
            size={'sm'}
            colorScheme="cyan"
          >language</Tag>
          <Tag
            size={'sm'}
            colorScheme="cyan"
          >language</Tag>
        </Wrap>
        <VStack
          flex={1}
          alignItems={'start'}
          gap={0}
        >
          <Text
            fontSize={'sm'}
            noOfLines={3}
          >{course.description}</Text>
        </VStack>
        <HStack
          width={'full'}
          justify={'end'}
        >
          <IconButton
            size={'sm'}
            aria-label="more..."
            icon={<ChevronRightIcon/>}
            onClick={() => router.push(`/courses/${course.id}`)}
            _hover={{
              boxShadow:'md',
              background: 'primary.darkBlue',
              color: 'white',
            }}
            isRound
          />
        </HStack>
      </VStack>

    </Card>
  );
};

export default CourseCard;