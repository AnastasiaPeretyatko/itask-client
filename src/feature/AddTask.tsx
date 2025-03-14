import { Flex, Input, ModalBody } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Property from './property';
import AddNewProperty from '@/feature/property/AddNewProperty';
import { AppDispatch, RootState } from '@/store';
import { task } from '@/store/task/task.slice';

const AddTask = () => {
  const taskModule = useSelector((state:RootState) => state.taskModule);
  const dispatch = useDispatch<AppDispatch>();

  const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(task.addTitle(e.target.value));
  };

  return (
    <ModalBody as={'form'}>
      <Input
        variant={'unstyled'}
        placeholder="Название задачи"
        onChange={changeTitle}
        size={'lg'}
        _placeholder={{ fontSize: '24px' }}
        fontSize={'24px'}
        mb={6}
        value={taskModule?.task?.title}
      />
      <Flex
        flexDirection={'column'}
        mb={2}
      >
        {
          taskModule?.task?.properties ? taskModule?.task?.properties.map((property) => (
            <Property
              key={property.id}
              property={property}
            />
          )) : null
        }
      </Flex>
      <AddNewProperty/>
    </ModalBody>
  );
};

export default AddTask;