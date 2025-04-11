import { Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Circle from '@/components/ui/Circle';
import InputForm from '@/components/ui/InputForm';
import { useNotifications } from '@/hooks/useNotifications';
import { loginRequest } from '@/services/auth.service';
import { AppDispatch } from '@/store';
import { settings } from '@/store/user/user.slice';

type loginType = {
  email: string
  password: string
}

const AuthPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit } = useForm<loginType>();
  const { showErrorMessage } = useNotifications();

  const onSubmit: SubmitHandler<loginType> = async (data) => {
    await loginRequest(data.email, data.password)
      .then( ({ data }) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch(settings.setUser(data.user));

        window.location.href = '/';
      })
      .catch((err) => showErrorMessage(err.response.data.message));
  };

  return (
    <Flex
      width={'full'}
      height={'100vh'}
      align={'center'}
      justify={'center'}
      position={'relative'}
      overflow={'hidden'}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack
          width={'500px'}
          bg={'white'}
          padding={8}
          borderRadius={10}
          gap={8}
        >
          <VStack>
            <Heading
              size={'lg'}
              color={'primary.purple'}
            >Авторизация</Heading>
            <Text
              size="sm"
              color={'text.pale'}
            >Join the community today!</Text>

          </VStack>

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
          <Button
            type="submit"
            width={'100%'}
            variant={'primary'}
          >
            Войти
          </Button>
        </VStack>
      </form>
      <Circle
        size={96}
        top={-48}
        right={-48}
      />
      <Circle
        size={96}
        bottom={-48}
        left={-40}
      />
      <Circle
        size={28}
        bottom={28}
        left={100}
      />
    </Flex>
  );
};

export default AuthPage;
