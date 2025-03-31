import { Box, Container, Input, useBoolean, useOutsideClick } from '@chakra-ui/react';
import { KeyboardEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PropertyProps } from '.';
import { AppDispatch } from '@/store';
import { addValue } from '@/store/professorModule/course/course.thunk';

export type TextPropertyType = {
  // align?: 'left' | 'right' | 'center';
  // onChange?: (value: string) => void;
  // className?: string;
  // inModal?: boolean;
  type?: 'number' | 'text' | 'file'
} & PropertyProps;

const TextProperty = ({ property, type = 'text', task }: TextPropertyType) => {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState(task.values[property.id] as string);
  const [isEdit, setIsEdit] = useBoolean(false);
  const ref = useRef<HTMLInputElement>(null);

  useOutsideClick({
    ref: ref,
    handler: () => save,
  });

  const save = () => {
    dispatch(addValue({ taskId: task.id, propertyId: property.id, value }));
    setIsEdit.off();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
    case 'Escape':
      setIsEdit.off();
      break;
    case 'Enter':
      save();
      break;
    }
  };

  const Edit = () => {
    return (
      <Input
        autoFocus
        ref={ref}
        value={value}
        onKeyDown={onKeyDown}
        onChange={(e) => setValue(e.target.value)}
        variant={'property'}
        height={'full'}
        boxShadow={'md'}
        type={type}
      />
    );
  };

  // useEffect(() => {
  //   if(isEdit && ref.current){
  //     ref.current.focus();
  //   }
  // }, [isEdit]);

  return (
    <Container variant={'property_modal'}>
      {
        isEdit ? <Edit /> : (
          <Box
            fontSize={'sm'}
            onClick={setIsEdit.on}
            padding={2}
            cursor={'pointer'}
            width={'full'}
            height={'full'}
            _hover={{
              background: 'button.neutral.bgDarker05',
              borderRadius: 3,
            }}
          >{value}</Box>
        )
      }
    </Container>
  );
};

export default TextProperty;