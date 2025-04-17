import { Avatar, Container, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import NotificationsBlock from '../notifications';
import { RootState } from '@/store';

const Header = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <>
      {/* alignItems убрать когда появятся другие компоненты */}
      <Container
        variant="header"
        alignItems={'end'}
      >
        <HStack height={'full'}>
          <NotificationsBlock />
          <Divider
            orientation="vertical"
            height={'full'}
          />
          <Avatar
            size={'sm'}
            name={user?.fullName[0]}
          />
          <VStack
            alignItems={'start'}
            gap={0}
          >
            <Text fontSize={'sm'}>{user?.fullName}</Text>
            <Text
              fontSize={12}
              color={'text.pale'}
            >{user?.role}</Text>
          </VStack>
        </HStack>
      </Container>
    </>
  );
};

export default Header;
