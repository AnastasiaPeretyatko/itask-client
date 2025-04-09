import { Button, Container, HStack, IconButton, Textarea } from '@chakra-ui/react';
import React from 'react';
import { EmailIcon } from '@/components/icon';

const CommentsBox = () => {
  return (
    <Container>
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
          >Отправить</Button>
        </HStack>
      </Container>
    </Container>
  );
};

export default CommentsBox;