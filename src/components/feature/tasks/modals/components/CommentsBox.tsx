import { Button, Container, HStack, IconButton, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import { EmailIcon } from '@/components/icon';

type Props = {
  onSendMessage: (content: string) => void
}

const CommentsBox = ({ onSendMessage }: Props) => {
  const [ content, setContent ] = useState<string>('');

  const handleSend = () => {
    onSendMessage(content);
    setContent('');
  };

  return (
    <Container width={'full'}>
      <Container
        background={'button.neutral.bgDarker05'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'end'}
        borderRadius={'md'}
        padding={3}
      >
        <Textarea
          variant={'unstyled'}
          minHeight={'unset'}
          resize={'none'}
          padding={0}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Написать комментарий..."
        />
        <HStack>
          <IconButton
            variant={'unstyled'}
            aria-label="email"
            icon={<EmailIcon/>}
            size={'sm'}
          />
          <Button
            variant={'primary'}
            size={'sm'}
            onClick={handleSend}
          >Отправить</Button>
        </HStack>
      </Container>
    </Container>
  );
};

export default CommentsBox;