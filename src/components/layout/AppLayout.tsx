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
    <VStack w="full" height="100vh" gap={1} overflow={'hidden'}>
      <Header />
      <HStack width={'100%'} height={'100%'} overflow={'hidden'} gap={4}>
        <Sidebar collapse={collapse} setCollapse={setCollapse} />
        <Flex
          as={'main'}
          w="full"
          h="full"
          alignItems="start"
          justifyContent="start"
          flexDir="column"
          borderRadius="3xl"
          overflowY="auto"
          p={10}
        >
          {children}
        </Flex>
      </HStack>
    </VStack>
  )
}

export default AppLayout
