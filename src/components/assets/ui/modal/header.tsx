import { Button, HStack, IconButton, ModalCloseButton, ModalHeader, Text } from '@chakra-ui/react';
import React from 'react';
import { ArrowsAngleContract } from '../../icon/ArrowsAngleContract';
import { ArrowsAngleExpand } from '../../icon/ArrowsAngleExpand';

type Props = {
  title: string
  icon?: React.ReactNode
  isChangeSize?: boolean
  stateSizeWindow?: boolean
  setIsFullSizeWindow?: () => void
}

const Header = ({ title, icon, isChangeSize, stateSizeWindow, setIsFullSizeWindow }: Props) => {

  return (
    <ModalHeader>
      <HStack>
        {
          isChangeSize ? (
            <IconButton
              aria-label="full size"
              variant={'unstyled'}
              icon={stateSizeWindow ? <ArrowsAngleContract/> : <ArrowsAngleExpand/>}
              onClick={setIsFullSizeWindow}
            />
          ) : null
        }
        {icon}
        <Text>{title}</Text>
      </HStack>
      <HStack>
        <Button
          size={'sm'}
          variant={'primary'}
        >Опубликовать</Button>
        <ModalCloseButton />
      </HStack>
    </ModalHeader>
  );
};

export default Header;