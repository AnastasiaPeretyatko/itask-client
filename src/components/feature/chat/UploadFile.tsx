import { Box, Container, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  isDrag: boolean;
  dragStarHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => void;
}

const UploadFile = ({ isDrag, dragStarHandler, dragLeaveHandler }: Props) => {
  return (
    <Box
      position={'absolute'}
      visibility={isDrag ? 'visible' : 'hidden'}
      w={`100%`}
      h={`100%`}
      p={5}
      borderRadius={'md'}
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(3px)"
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      {
        isDrag ? (
          <Container
            w={'full'}
            h={'full'}
            m={5}
            border={'2px dashed red'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={'lg'}
            onDragEnter={dragStarHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragStarHandler}
          >
            <Text>Drop File</Text>
          </Container>
        ) : null
      }
    </Box>
  );
};

export default UploadFile;