import { CourseT } from '@/types/course.type'
import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import React from 'react'

type Props = {
  course: CourseT
}

const CardCourse = ({ course }: Props) => {
  return (
    <>
      <Card
        maxW={{ sm: '100%', base: '400px' }}
        width={'100%'}
        p={4}
        direction={{ base: 'column', sm: 'row' }}
        gap={4}
        overflow="hidden"
        boxShadow={'md'}
        borderRadius={10}
        color="black"
      >
        <Image
          src="/course.webp"
          objectFit="cover"
          maxW={{ base: '28', sm: '150px' }}
          maxH={{ base: '28', sm: '150px' }}
          borderRadius={8}
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
          <CardFooter
            width={'100%'}
            padding="unset"
            justify="space-between"
            alignItems={'flex-end'}
          >
            <AvatarGroup size="sm" max={3}>
              {course.professors.map(professor => (
                <Tooltip key={professor.id} label={professor.fullName} hasArrow>
                  <Avatar size={'sm'} name={professor.fullName} cursor={'pointer'} />
                </Tooltip>
              ))}
            </AvatarGroup>
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
