import { Box, HStack, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const cycleOne = keyframes`
  0%, 66.667%, 100% { background: rgba(150, 150, 150, 0.4); }
  33.333% { background: rgba(150, 150, 150, 1); }
`;

const cycleTwo = keyframes`
  0%, 33.333%, 100% { background: rgba(150, 150, 150, 0.4); }
  66.667% { background: rgba(150, 150, 150, 1); }
`;

const cycleThree = keyframes`
  0%, 66.667% { background: rgba(150, 150, 150, 0.4); }
  100% { background: rgba(150, 150, 150, 1); }
`;

export const ChatBubble = () => {
  return (
    <HStack
      minH={'max-content'}
      flexWrap={'nowrap'}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
      >
        <Box
          w="5px"
          h="5px"
          borderRadius="full"
          bg="rgba(150, 150, 150, 0.4)"
          animation={`${cycleOne} 1s ease-in-out infinite`}
        />
        <Box
          w="5px"
          h="5px"
          borderRadius="full"
          bg="rgba(150, 150, 150, 0.4)"
          animation={`${cycleTwo} 1s ease-in-out infinite`}
        />
        <Box
          w="5px"
          h="5px"
          borderRadius="full"
          bg="rgba(150, 150, 150, 0.4)"
          animation={`${cycleThree} 1s ease-in-out infinite`}
        />
      </Box>
      <Text
        fontSize={'12px'}
        color={'text.pale'}
      >Печатает</Text>
    </HStack>
  );
};
