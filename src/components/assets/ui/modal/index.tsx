import { Modal as ChakraModal, ModalContent, ModalOverlay, useBoolean, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import Header from './header';

type Props = {
  title: string;
  children: JSX.Element
  action: JSX.Element
  height?: string
}

const Modal = ({ title, children, action, height, ...rest }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ isFullSizeWindow, setIsFullSizeWindow ] = useBoolean();

  return (
    <>
      {React.cloneElement(action, { onClick: onOpen, ...rest })}

      <ChakraModal
        isOpen={isOpen}
        onClose={onClose}
        size={isFullSizeWindow ? 'full' : '4xl'}
        isCentered
      >
        <ModalOverlay />
        <ModalContent height={height || 'unset'}>
          <Header
            title={title}
            stateSizeWindow={isFullSizeWindow}
            setIsFullSizeWindow={setIsFullSizeWindow.toggle}
            isChangeSize
          />
          {React.cloneElement(children, { onClose })}
        </ModalContent>
      </ChakraModal>
    </>

  );
};

export default Modal;