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

const CardCourse = () => {
  return (
    <>
      <Card
				maxW={{sm:'100%', base: 96}}
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
        <Stack>
          <CardBody padding="unset">
            <Heading size="md">The perfect latte</Heading>
            <Text py="2" fontWeight={400}>
              Caffè latte is a coffee beverage of Italian origin made with
              espresso and steamed milk.
            </Text>
          </CardBody>
          <CardFooter padding="unset" justify="end">
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
