import { CourseT } from '@/types/course.type'
import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'

type Props = {
  course: CourseT
}

const CardCourse = ({ course }: Props) => {
  return (
    <>
      <Card
        maxW={{ sm: '100%', base: 96 }}
        // maxH={'200px'}
        p={4}
        direction={{ base: 'column', sm: 'row' }}
        gap={4}
        overflow="hidden"
        bg="SECONDARY_BLUE"
        color="black"
      >
        <Image
          src="/course.png"
          objectFit="cover"
          maxW={{ base: '28', sm: '150px' }}
          maxH={{ base: '28', sm: '150px' }}
        />
        <Stack width={'100%'} height={'100%'} overflow={'hidden'}>
          <CardBody padding="unset">
            <Heading size="md" mb={4}>
              {course.course.name}
            </Heading>
            <Text fontWeight={400} noOfLines={4}>
              {course.course.description}
            </Text>
          </CardBody>
          <CardFooter width={'100%'} padding="unset" justify="end">
            <IconButton
              variant="unstyled"
              borderRadius="50%"
              bg="PRIMARY_BLUE"
              color="white"
              aria-label="next"
              display="flex"
              alignItems="center"
              justifyContent="center"
              icon={<ChevronRightIcon />}
            />
          </CardFooter>
        </Stack>
      </Card>
    </>
  )
}

export default CardCourse
