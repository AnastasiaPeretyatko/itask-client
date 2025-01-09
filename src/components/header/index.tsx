import { Avatar, Container, HStack } from '@chakra-ui/react'
import NotificationsBlock from '../notifications'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const Header = () => {
  const {user} = useSelector((state: RootState) => state.user)

  return (
    <>
      {/* alignItems убрать когда появятся другие компоненты */}
      <Container variant="header" alignItems={'end'}>
        <HStack>
          <NotificationsBlock />
          <Avatar size={'sm'} name={user?.fullNmae} />
        </HStack>
      </Container>
    </>
  )
}

export default Header
