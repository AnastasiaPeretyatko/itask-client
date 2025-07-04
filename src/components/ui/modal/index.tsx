import { Modal as ChakraModal, ModalContent, ModalOverlay, useBoolean, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import Header from './header';

type Props = {
  title?: string;
  renderBody: (props: BodyItemProps) => React.ReactElement;
  action?: JSX.Element
  height?: string
  isTask?: boolean
  isOpenModal?: boolean
  onCloseModal?: () => void
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full'
  isDisplay?: boolean
}

export type BodyItemProps = {
  onClose?: () => void
  isFullSizeWindow?: boolean
  setIsFullSizeWindow?: () => void
};

export type RenderBodyType = React.ReactElement<BodyItemProps>;

const Modal = ({ title, renderBody, action, height, isTask = false, isOpenModal, onCloseModal, size = '4xl', isDisplay = true, ...rest }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ isFullSizeWindow, setIsFullSizeWindow ] = useBoolean();

  return (
    <>
      {!isOpenModal && isDisplay && action ? React.cloneElement(action, { onClick: onOpen, ...rest }) : null}

      <ChakraModal
        isOpen={isOpenModal || isOpen}
        onClose={onCloseModal || onClose}
        size={isFullSizeWindow ? 'full' : size}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          height={height || 'unset'}
          maxH={'full'}
          overflow={'hidden'}
        >
          {
            isTask ? (
              <Header
                title={title || ''}
                stateSizeWindow={isFullSizeWindow}
                setIsFullSizeWindow={setIsFullSizeWindow.toggle}
                isChangeSize
              />
            ) : null
          }
          {renderBody({
            onClose: onCloseModal || onClose,
            isFullSizeWindow,
            setIsFullSizeWindow: setIsFullSizeWindow.toggle,
          })}
        </ModalContent>
      </ChakraModal>
    </>
  );
};

export default Modal;