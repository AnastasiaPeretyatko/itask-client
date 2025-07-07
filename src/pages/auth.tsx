import { Button, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import Circle from '@/components/ui/Circle';
import InputForm from '@/components/ui/InputForm';
import { useNotifications } from '@/hooks/useNotifications';
import { useUserStore } from '@/v1/entites/User/module';

type loginType = {
  email: string
  password: string
}

const AuthPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<loginType>();
  const { showErrorMessage } = useNotifications();
  const setUser = useUserStore((state) => state.setUser);

  const onSubmit: SubmitHandler<loginType> = async (data) => {
    setUser(data.email, data.password)
      .then(() => router.push('/'))
      .catch(showErrorMessage);
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
          align={'start'}
        >
          <VStack
            width={'full'}
            align={'center'}
          >
            <Heading
              size={'lg'}
              color={'primary.purple'}
            >Авторизация</Heading>
            <Text
              size="sm"
              color={'text.pale'}
            >Войдите в свой аккаунт</Text>
          </VStack>

          <InputForm
            label="Эл. почта"
            placeholder="Эл. почта..."
            type="email"
            register={register('email')}
          />
          <InputForm
            label="Пароль"
            placeholder="Пароль..."
            type="password"
            register={register('password', { required: true })}
          />
          <Link color={'primary.purple'}>Забыл пароль?</Link>
          <Button
            type="submit"
            width={'100%'}
            variant={'primary'}
            size={'md'}
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
