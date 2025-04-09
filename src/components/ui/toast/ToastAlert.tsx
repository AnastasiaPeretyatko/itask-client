import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Box, HStack, Text } from '@chakra-ui/react';

type Props = {
  message: string;
  success?: boolean;
  error?: boolean;
}

const ToastAlert = ({ message, error, success }: Props) => {
  return (
    <HStack
      background={'toast.bg'}
      color={'toast.text'}
      paddingX={3}
      paddingY={2}
      borderRadius={'md'}
      maxW={'500px'}
    >
      <Box
        padding={1}
        border="1px solid white.50"
        borderRadius={'full'}
      >
        {success ? <CheckIcon/> : null}
        {error ? <NotAllowedIcon/> : null}
      </Box>
      <Text noOfLines={3}>{message}</Text>
    </HStack>
  );
};

export default ToastAlert;