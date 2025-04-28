import { RepeatClockIcon } from '@chakra-ui/icons';
import { Avatar, Card, Heading, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import React from 'react';
import { EmailIcon } from '@/components/icon';

const UserInfoPanel = () => {
  return (
    <Card
      width={'20%'}
      display={'flex'}
      flexDir={'column'}
      align={'center'}
      padding={5}
      gap={2}
    >
      <Avatar size={'lg'}/>
      <Heading size={'sm'}>Ivanov Ivan</Heading>
      <Text
        fontSize={'sm'}
        color={'text.pale'}
      >Role</Text>

      <Heading
        width={'full'}
        size={'xs'}
        textAlign={'start'}
      >Персональная инфрмация</Heading>
      <List
        width={'full'}
        fontSize={'sm'}
        color={'text.pale'}
      >
        <ListItem> <ListIcon as={EmailIcon}/>user@user.com</ListItem>
        <ListItem> <ListIcon as={EmailIcon}/>+1 789 903-7331</ListItem>
        <ListItem> <ListIcon as={RepeatClockIcon}/>Mon - Fri: 9:00 AM - 6:00 PM</ListItem>
      </List>
    </Card>
  );
};

export default UserInfoPanel;