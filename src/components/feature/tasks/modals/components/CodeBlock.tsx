import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Card, CloseButton, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { FileEarmarkCodeIcon } from '@/components/icon';

type Props = {
  state?: boolean
}

const CodeFileAttachment = ({ state = false }: Props) => {
  return (
    <Card
      border={'1px solid'}
      borderColor={state ? 'primary.blue' : 'red.200'}
      _hover={{
        background: 'background.main',
      }}
      boxShadow={'lg'}
      flexDir={'row'}
      padding={2}
      width={'250px'}
      gap={4}
      mb={2}
    >
      <IconButton
        aria-label="file code"
        variant={'unstyled'}
        size={'sm'}
        icon={<FileEarmarkCodeIcon boxSize={7}/>}
      />
      <VStack
        align={'start'}
        gap={0}
      >
        <Text>Код</Text>
        <HStack fontSize={'xs'}>
          <IconButton
            isRound
            minW={4}
            height={4}
            variant="solid"
            colorScheme={state ? 'teal' : 'red'}
            aria-label="check"
            icon={state ? <CheckIcon boxSize={2}/> : <SmallCloseIcon/>}
          />
          <Text color={'text.pale'}>{state ? 'Completed' : 'Error'}</Text>
        </HStack>

      </VStack>
      <CloseButton
        size={'sm'}
        position={'absolute'}
        top={0}
        right={0}
      />
    </Card>
  );
};

export default CodeFileAttachment;