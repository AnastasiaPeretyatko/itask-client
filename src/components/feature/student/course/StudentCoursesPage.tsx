import { Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import CardCourse from './CardCourse'
import SearchInput from '@/components/assets/ui/SearchInput'

const StudentCoursesPage = () => {
  return (
    <VStack width="100%" align="start" padding={4}>
      <HStack width={'100%'} justify={'space-between'} mb={4}>
        <Heading size="md" whiteSpace={'nowrap'}>
          Мои курсы
        </Heading>
        <SearchInput placeholder="Поиск..." />
      </HStack>
      <SimpleGrid width={'100%'} columns={{ sm: 1, md: 2, xl: 3 }} spacing={6}>
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
      </SimpleGrid>
    </VStack>
  )
}

export default StudentCoursesPage
