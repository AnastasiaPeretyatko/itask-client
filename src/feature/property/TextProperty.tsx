import { Box, Container, Input, useBoolean, useOutsideClick } from '@chakra-ui/react';
import { KeyboardEvent, useRef, useState } from 'react';
import { PropertyProps } from '.';

export type TextPropertyType = {
  // align?: 'left' | 'right' | 'center';
  // onChange?: (value: string) => void;
  // className?: string;
  // inModal?: boolean;
  type?: 'number' | 'text' | 'file'
} & PropertyProps;

const TextProperty = ({ property, type = 'text', task, onChange }: TextPropertyType) => {
  const [value, setValue] = useState(task.values[property.id] as string);
  const [isEdit, setIsEdit] = useBoolean(false);
  const ref = useRef<HTMLInputElement>(null);

  useOutsideClick({
    ref: ref,
    handler: () => save,
  });

  const save = () => {
    // dispatch(addValue({ taskId: task.id, propertyId: property.id, value }));
    onChange?.(value);
    setIsEdit.off();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
    case 'Escape':
      save();
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

  return (
    <Container variant={'property_modal'}>
      {
        isEdit ? <Edit /> : (
          <Box
            fontSize={'sm'}
            onClick={setIsEdit.on}
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