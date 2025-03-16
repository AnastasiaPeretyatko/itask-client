import { Button, Card, Heading, HStack, Image, Tag, Text, VStack, Wrap } from '@chakra-ui/react';
import { BaseCourseT } from '@/types/course.type';
import { getTextFromEditor } from '@/utils/getTextFromEditor';

type Props = {
  course: BaseCourseT
}

const CourseCard = ({ course }: Props) => {
  const description: string[] = getTextFromEditor(course.description);
  console.log({ description });

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
        gap={0}
      >
        <Wrap>
          <Tag>language</Tag>
          <Tag>language</Tag>
        </Wrap>
        <Heading
          size="lg"
          mb={4}
        >
          {course.name}
        </Heading>
        <Text>{description[0]}</Text>
        <Text>{description[1]}</Text>
        <HStack
          width={'full'}
          justify={'end'}
        >
          <Button
            size={'sm'}
            variant={'primary'}
          >Подробнее</Button>
        </HStack>
      </VStack>

    </Card>
  );
};

export default CourseCard;