import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink, Heading, HStack, Text,
  useBoolean,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DrowerAnswer from '@/components/feature/tasks/components/DrowerAnswer';
import DrowerComment from '@/components/feature/tasks/components/DrowerComment';
import AppLayout from '@/components/layout/AppLayout';
import Editor from '@/components/ui/Editor/Editor';
import { AppDispatch, RootState } from '@/store';
import { getTaskByIdThunk } from '@/store/task/task.thunk';
import { UserRole } from '@/types/user.type';

const TaskPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { task } = useSelector((state: RootState) => state.newTask);
  const [isLoading, setIsLoading] = useBoolean(true);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setIsLoading.on();
    if(router.query.id){
      dispatch(getTaskByIdThunk(router.query.id as string))
        .unwrap()
        .then(setIsLoading.off);
    }
    setIsLoading.off();
  }, [dispatch, router.query, setIsLoading]);

  console.log({ task });

  if(!task){
    return <Text>Загрузка...</Text>;
  }

  return (
    <AppLayout loading={isLoading || !task}>
      <HStack
        width={'full'}
        justify={'space-between'}
        mb={4}
      >
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/courses/${task.assignment.course.id}`}>
              {task.assignment.course.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              href=""
              isCurrentPage
            >{task.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HStack>
          <DrowerComment/>
          <DrowerAnswer isDisabled={user?.role === UserRole.Professor}/>
        </HStack>
      </HStack>
      <VStack
        width={'full'}
        align={'start'}
      >
        <Heading
          variant={'title'}
        >{task.title}</Heading>
        <Editor markdown={task.text} />
      </VStack>
    </AppLayout>
  );
};

export default TaskPage;