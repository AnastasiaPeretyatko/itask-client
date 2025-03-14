import { Tag as ChakraTag, TagLabel, TagProps as ChakraTagProps } from '@chakra-ui/react';
import { useMemo } from 'react';

type TagProps<T> = {
  option: T,
  onChange: (option: T) => void,
  onClose?: () => void
} & ChakraTagProps

const Tag = <T,>({ option, onChange, onClose, ...props }: TagProps<T>) => {
  const color = useMemo(() => {
    switch (option.id) {
    case 'todo':
      return 'red';
    case 'in_progress':
      return 'yellow';
    case 'done':
      return 'green';
    default:
      return 'blue';
    }
  }, [option]);

  return (
    <ChakraTag
      {...props}
      variant={'property_tag'}
      size={'sm'}
      background={`${color}.200`}
      onClick={() => {
        onChange(option);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onClose && onClose();
      }}

    >
      <TagLabel>{option.name}</TagLabel>
    </ChakraTag>
  );
};

export default Tag;