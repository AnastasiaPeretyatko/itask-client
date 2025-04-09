import { Container, Input, Text, useDisclosure } from '@chakra-ui/react';
import { KeyboardEvent, useState } from 'react';

type Props = {
  value: string | number | null;
  onChange: (value: string | number) => void;
}

const ScoreProperty = ({ onChange, value }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState(value ?? '');

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

  return (
    <Container
      variant="property_modal"
      onClick={onOpen}
    >
      {isOpen ? (
        <Input
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