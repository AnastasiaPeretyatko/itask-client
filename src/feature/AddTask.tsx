import { Flex, Input, ModalBody } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropertyLine from './property/PropertyLine';
import AddNewProperty from '@/feature/property/AddNewProperty';
import { AppDispatch, RootState } from '@/store';
import { changeTaskTitle, createTask } from '@/store/professorModule/course/course.slice';
import { TaskModel } from '@/types/course.type';

const AddTask = () => {
  const { course } = useSelector((state:RootState) => state.courseStore);
  const dispatch = useDispatch<AppDispatch>();
  const [task, setTask] = useState<TaskModel | null>(null);

  const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskTitle({ taskId: task?.id as string, title: e.target.value }));
  };

  useEffect(() => {
    const result = dispatch(createTask());
    setTask(result.payload);
  }, [dispatch]);

  return (
    <ModalBody as={'form'}>
      <Input
        variant={'unstyled'}
        placeholder="Название задачи..."
        onChange={changeTitle}
        size={'lg'}
        _placeholder={{ fontSize: '24px' }}
        fontSize={'24px'}
        mb={2}
        value={task?.title}
      />
      <Flex
        flexDirection={'column'}
        mb={2}
      >
        {
          course?.properties ? course.properties.map((property) => (
            <PropertyLine
              key={property.id}
              property={property}
              task={task as TaskModel}
            />
          )) : null
        }
      </Flex>
      <AddNewProperty/>
    </ModalBody>
  );
};

export default AddTask;