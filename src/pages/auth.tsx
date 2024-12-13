import InputForm from '@/components/assets/ui/InputForm'
import { Button, Flex, Heading, VStack } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import React from 'react'
import { loginRequest } from '@/services/auth.service'

type loginType = {
  email: string
  password: string
}

const AuthPage = () => {
  const { register, handleSubmit } = useForm<loginType>()

  const onSubmit: SubmitHandler<loginType> = async data => {
    await loginRequest(data.email, data.password)
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        window.location.href = '/'
      })
      .catch(err => console.log(err))
  }

  return (
    <Flex
      width={'full'}
      height={'100vh'}
      background={'black'}
      align={'center'}
      justify={'center'}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack
          width={'500px'}
          bg={'white'}
          padding={8}
          borderRadius={10}
          gap={8}
        >
          <Heading size={'lg'}>Авторизация</Heading>
          <InputForm
            label="Email"
            placeholder="Email..."
            type="email"
            register={register('email')}
          />
          <InputForm
            label="Пароль"
            placeholder="Пароль..."
            type="password"
            register={register('password')}
          />
          <Button type="submit" width={'100%'}>
            Войти
          </Button>
        </VStack>
      </form>
    </Flex>
  )
}

export default AuthPage
