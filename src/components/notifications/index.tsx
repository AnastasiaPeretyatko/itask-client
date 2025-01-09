import {
  Box,
  Card,
  CardHeader,
  Heading,
  HStack,
  IconButton,
  Link,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  useBoolean,
  useOutsideClick,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import { BellIcon } from '../customIcon'
import { SettingsIcon } from '@chakra-ui/icons'
import Message from './Message'

const NotificationsBlock = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useBoolean(false)

  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen.off(),
  })

  return (
    <Box position={'relative'}>
      <BellIcon
        boxSize={7}
        onClick={() => setIsOpen.toggle()}
        cursor={'pointer'}
        _hover={{
          color: 'blue.500',
        }}
      />
      {isOpen && (
        <Card
          ref={ref}
          zIndex={10}
          position={'fixed'}
          right={3}
          top={'70px'}
          minW={400}
          boxShadow={'lg'}
        >
          <CardHeader p={3} fontWeight={600} fontSize={16}>
            <HStack justify={'space-between'}>
              <Heading size={'sm'}>Notifications</Heading>
              <Link fontSize={'sm'} textDecor={'underline'}>
                Read all
              </Link>
            </HStack>
          </CardHeader>
          <Tabs position="relative" variant="notifications">
            <TabList fontSize={'sm'}>
              <HStack>
                <Tab>
                  <Text>All</Text> <Tag>8</Tag>
                </Tab>
                <Tab>
                  <Text>Task</Text> <Tag>6</Tag>
                </Tab>
                <Tab>Message</Tab>
              </HStack>
              <IconButton
                variant={'unstyled'}
                aria-label="settings"
                icon={<SettingsIcon />}
                _hover={{
                  transform: 'rotate(180deg)',
                }}
                transition="transform 1s ease-in-out"
              />
            </TabList>
            <TabIndicator mt="-1.7px" height="2px" borderRadius="1px" />
            <TabPanels>
              <TabPanel>
                <Message />
                <Message />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Card>
      )}
    </Box>
  )
}

export default NotificationsBlock
