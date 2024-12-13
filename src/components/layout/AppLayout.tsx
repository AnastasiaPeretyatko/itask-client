import { Flex, HStack, Spinner, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import Header from '../header'
import Sidebar from '../sidebar'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapse, setCollapse] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  if (isLoading) {
    return (
      <VStack width="100%" height="100vh" align="center" justify="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="SECONDARY_BLUE"
          color="PRIMARY_BLUE"
          size="xl"
        />
      </VStack>
    )
  }

  return (
    <VStack w="full" height="100vh" gap={0} overflow={'hidden'}>
      <Header />
      <HStack width={'100%'} height={'100%'} overflow={'hidden'} gap={0}>
        <Sidebar collapse={collapse} setCollapse={setCollapse} />
        <Flex
          as={'main'}
          w="100%"
          h="full"
          alignItems="start"
          justifyContent="start"
          flexDir="column"
          overflowY="auto"
          p={2}
          bg={'gray.100'}
        >
          {children}
        </Flex>
      </HStack>
    </VStack>
  )
}

export default AppLayout
