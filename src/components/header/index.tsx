import { Avatar, Container, Divider, HStack } from '@chakra-ui/react';
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
            name={user?.fullNmae}
          />
        </HStack>
      </Container>
    </>
  );
};

export default Header;
