import { Avatar, Container, HStack } from '@chakra-ui/react'
import { BellIcon } from '../customIcon'

const Header = () => {
  return (
    <>
      {/* alignItems убрать когда появятся другие компоненты */}
      <Container variant="header" alignItems={'end'}>
        <HStack>
          <BellIcon boxSize={7} />
          <Avatar size={'sm'} name={'John Doe'} />
        </HStack>
      </Container>
    </>
  )
}

export default Header
