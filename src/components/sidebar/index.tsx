import { LogoutIcon, MenuIcon } from '@/components/customIcon'
import { Button, Container, IconButton, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NAVBAR_ITEM } from './sidebar-config'
import { CloseIcon } from '@chakra-ui/icons'

type Props = {
  collapse: boolean
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ collapse, setCollapse }: Props) => {
  const router = useRouter()

  const handleClickLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/auth'
  }

  return (
    <Container variant="sidebar" boxShadow={'base'} maxW={collapse ? 200 : 20}>
      <IconButton
        aria-label="menu"
        variant="unstyled"
        textAlign={collapse ? 'end' : 'center'}
        icon={collapse ? <CloseIcon /> : <MenuIcon />}
        fontSize={'xs'}
        onClick={() => setCollapse(!collapse)}
      />

      <VStack
        height="100%"
        justify="space-between"
        align={collapse ? 'center' : 'start'}
        width={'100%'}
      >
        <VStack width={'100%'} align={collapse ? 'start' : 'center'}>
          {NAVBAR_ITEM.map(el => {
            return (
              <Button
                key={el.title}
                size="sm"
                variant="sidebar"
                textAlign={'center'}
                justifyContent={!collapse ? 'center' : 'start'}
                leftIcon={el.icon}
                onClick={() => router.push(el.path)}
                isActive={router.pathname === el.path}
              >
                {collapse && el.title}
              </Button>
            )
          })}
        </VStack>
      </VStack>
      <Button
        size="sm"
        variant="sidebar"
        textAlign={'center'}
        justifyContent={!collapse ? 'center' : 'start'}
        leftIcon={<LogoutIcon bgSize={3} />}
        onClick={handleClickLogOut}
      >
        {collapse && 'Выйти'}
      </Button>
    </Container>
  )
}

export default Sidebar
