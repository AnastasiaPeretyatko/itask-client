import { Modal as ChakraModal, ModalContent, ModalOverlay, useBoolean, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import Header from './header';

type Props = {
  title?: string;
  renderBody: (props: BodyItemProps) => React.ReactElement;
  action: JSX.Element
  height?: string
  isTask?: boolean
}

export type BodyItemProps = {
  onClose: () => void
  isFullSizeWindow: boolean
  setIsFullSizeWindow: () => void
};

export type RenderBodyType = React.ReactElement<BodyItemProps>;


const Modal = ({ title, renderBody, action, height, isTask, ...rest }: Props) => {
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
          {
            !isTask ? (
              <Header
                title={title || ''}
                stateSizeWindow={isFullSizeWindow}
                setIsFullSizeWindow={setIsFullSizeWindow.toggle}
                isChangeSize
              />
            ) : null
          }
          {renderBody({
            onClose,
            isFullSizeWindow,
            setIsFullSizeWindow: setIsFullSizeWindow.toggle,
          })}
        </ModalContent>
      </ChakraModal>
    </>

  );
};

export default Modal;