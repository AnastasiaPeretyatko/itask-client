import { Modal as ChakraModal, ModalContent, ModalOverlay, useBoolean, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import Header from './header';

type Props = {
  title: string;
  children: JSX.Element
  action: JSX.Element
}

const Modal = ({ title, children, action, ...rest }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ isFullSizeWindow, setIsFullSizeWindow ] = useBoolean();

  return (
    <>
      {React.cloneElement(action, { onClick: onOpen, ...rest })}

      <ChakraModal
        isOpen={isOpen}
        onClose={onClose}
        size={isFullSizeWindow ? 'full' : 'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <Header
            title={title}
            stateSizeWindow={isFullSizeWindow}
            setIsFullSizeWindow={setIsFullSizeWindow.toggle}
          />
          {React.cloneElement(children, { onClose })}
        </ModalContent>
      </ChakraModal>
    </>

  );
};

export default Modal;