import { Box, Input, useBoolean, useOutsideClick } from '@chakra-ui/react';
import { KeyboardEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PropertyProps } from '.';
import Labeled from '@/components/assets/ui/Labled';
import { AppDispatch } from '@/store';
import { task } from '@/store/task/task.slice';

export type TextPropertyType = {
  // align?: 'left' | 'right' | 'center';
  // onChange?: (value: string) => void;
  // className?: string;
  // inModal?: boolean;
  type?: 'number' | 'text' | 'file'
} & PropertyProps;

const TextProperty = ({ property, type = 'text' }: TextPropertyType) => {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState(property.value || '');
  const [isEdit, setIsEdit] = useBoolean(false);
  const ref = useRef(null);

  useOutsideClick({
    ref: ref,
    handler:  () => {
      setIsEdit.off();
      saveProperty();
    },
  });

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter'){
      setIsEdit.off();
    }
  };

  const saveProperty = () => {
    dispatch(task.changeProperty({ property: { ...property, value } }));
  };

  const Edit = () => {
    return (
      <Input
        ref={ref}
        value={value}
        onKeyDown={onKeyDown}
        onChange={(e) => setValue(e.target.value)}
        variant={'property'}
        type={type}
      />
    );
  };

  return (
    <Labeled label="Текст">
      {
        isEdit ? <Edit /> : (
          <Box
            fontSize={'sm'}
            onClick={setIsEdit.on}
            paddingY={2}
            cursor={'pointer'}
            width={'full'}
          >{value}</Box>
        )
      }
    </Labeled>
  );
};

export default TextProperty;