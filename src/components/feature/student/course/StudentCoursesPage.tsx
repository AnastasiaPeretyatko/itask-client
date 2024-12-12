import { Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import CardCourse from './CardCourse'

const StudentCoursesPage = () => {
  return (
    <VStack width="100%" align="start">
      <Heading size="md" mb={4}>Мои курсы</Heading>
      <CardCourse />
      <CardCourse />
      <CardCourse />
      <CardCourse />
      <CardCourse />
    </VStack>
  )
}

export default StudentCoursesPage