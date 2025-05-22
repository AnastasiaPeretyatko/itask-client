import { Avatar, AvatarGroup, Card, Heading, HStack, Tag, TagLabel, TagLeftIcon, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { NumberIcon } from '@/components/icon';
import ButtonUI from '@/components/ui/ButtonUI';
import { TCourse } from '@/types/course.type';
import { getRandomChakraColor } from '@/utils/getRandomChakraColor';

type Props = {
  course: TCourse
}

const CourseCard = ({ course }: Props) => {
  const router = useRouter();

  return (
    <Card
      direction={'row'}
      height={'300px'}
      padding={3}
      borderRadius={'2xl'}
      gap={3}
      background={'background.main'}
      overflow={'hidden'}
    >
      <VStack
        width={'full'}
        align={'start'}
        padding={2}
        gap={4}
      >
        <Heading
          size="md"
          noOfLines={2}
        >
          {course.name}
        </Heading>
        {course.tags?.length ? (
          <HStack>
            {
              course.tags?.map((tag) => (
                <Tag
                  key={tag}
                  colorScheme={getRandomChakraColor().split('.')[0]}
                >
                  <TagLeftIcon as={NumberIcon}/>
                  <TagLabel>{tag}</TagLabel>
                </Tag>
              ))
            }
          </HStack>
        ) : null}
        {course.language ? (
          <Tag
            key={course.language}
            colorScheme={getRandomChakraColor().split('.')[0]}
          >
            <TagLeftIcon as={NumberIcon}/>
            <TagLabel>{course.language}</TagLabel>
          </Tag>
        ) : null}
        {course.assessment_system ? (
          <Tag
            key={course.assessment_system}
            colorScheme={getRandomChakraColor().split('.')[0]}
          >
            <TagLeftIcon as={NumberIcon}/>
            <TagLabel>{course.assessment_system}</TagLabel>
          </Tag>
        ) : null}
        <VStack
          flex={1}
          alignItems={'start'}
          gap={0}
          maxH={'full'}
          overflow={'hidden'}
        >
          <Text
            fontSize={'md'}
            noOfLines={4}
            whiteSpace={'pre-wrap'}
          >
            <ReactMarkdown>{course.description}</ReactMarkdown>
          </Text>
        </VStack>
        <HStack
          width={'full'}
          justify={'space-between'}
        >
          <AvatarGroup
            max={3}
            size={'sm'}
          >
            {
              course.professors?.map((professor) => (
                <Avatar
                  key={professor.id}
                  size={'sm'}
                  // name={professor.fullName}
                />
              ))
            }
          </AvatarGroup>
          <ButtonUI
            variant={'secondary'}
            onClick={() => router.push(`/courses/${course.id}`)}
          >
            Подробнее...
          </ButtonUI>
        </HStack>
      </VStack>
    </Card>
  );
};

export default CourseCard;