import { Divider, Flex, Input, ModalBody } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropertyLine from './property/PropertyLine/PropertyLine';
import Editor from '@/components/assets/ui/Editor/Editor';
import AddNewProperty from '@/feature/property/AddNewProperty';
import { AppDispatch, RootState } from '@/store';
import { changeTaskTitle, createTask } from '@/store/professorModule/course/course.slice';
import { TaskModel } from '@/types/course.type';

const AddTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { course } = useSelector((state:RootState) => state.courseStore);

  const [task, setTask] = useState<TaskModel | null>(null);
  const [editor, setEditor] = useState<string>();
  const [title, setTitle] = useState<string>('');

  const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskTitle({ taskId: task?.id as string, title: e.target.value }));
  };

  useEffect(() => {
    const result = dispatch(createTask());
    setTask(result.payload);
    setTitle(result.payload.title);
  }, [dispatch]);

  return (
    <ModalBody as={'form'}>
      <Input
        variant={'title'}
        placeholder="Название задачи..."
        onChange={(e) => setTitle(e.target.value)}
        mt={10}
        mb={3}
        value={title}
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
      <Divider my={4}/>
      <Editor
        editable
        initialContent={editor}
        onChange={setEditor}
      />
    </ModalBody>
  );
};

export default AddTask;