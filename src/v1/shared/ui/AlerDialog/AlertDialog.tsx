import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  title: string;
  description: string;
  textActiveButton: string;
  callButton: JSX.Element;
  onClick: () => void
}

const AlertDialog = ({ title, description, textActiveButton, callButton, onClick }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  const handleClick = () => {
    onClick();
    onClose();
  };

  return (
    <>
      {React.cloneElement(callButton, { onClick: onOpen })}

      <ChakraAlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            padding={3}
            borderRadius={14}
          >
            <AlertDialogHeader
              fontSize="lg"
              textAlign={'center'}
              justifyContent={'center'}
            >
              {title}
            </AlertDialogHeader>

            <AlertDialogBody
              textAlign={'center'}
              color={'text.pale'}
              mb={4}
            >
              {description}
            </AlertDialogBody>

            <AlertDialogFooter padding={1}>
              <Button
                ref={cancelRef}
                onClick={onClose}
                width={'50%'}
              >
                Отмена
              </Button>
              <Button
                colorScheme="red"
                onClick={handleClick}
                ml={3}
                width={'50%'}
              >
                {textActiveButton}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </ChakraAlertDialog>
    </>
  );
};

export default AlertDialog;