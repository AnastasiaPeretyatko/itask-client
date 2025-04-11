import { Container, Input, Text, useDisclosure, useOutsideClick } from '@chakra-ui/react';
import { KeyboardEvent, useRef, useState } from 'react';

type Props = {
  value: string | number | null;
  onChange: (value: string | number) => void;
  readOnly?: boolean
}

const ScoreProperty = ({ onChange, value, readOnly }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState(value ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
    case 'Enter': {
      onChange(input);
      onClose();
      break;
    }
    case 'Escape': {
      onClose();
      break;
    }
    }
  };

  useOutsideClick({
    ref: inputRef,
    handler: () => {
      onChange(input);
      onClose();
    },
  });

  return (
    <Container
      variant="property_modal"
      onClick={onOpen}
    >
      {!readOnly && isOpen ? (
        <Input
          autoFocus
          ref={inputRef}
          size={'sm'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDownInput}
        />
      ) : (<Text>{value}</Text>)}

    </Container>
  );
};

export default ScoreProperty;