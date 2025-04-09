import { Button, ButtonProps } from '@chakra-ui/react';
import { JSXElementConstructor, ReactElement } from 'react';

type Props = {
  title: string;
  icon?: ReactElement<unknown, string | JSXElementConstructor<unknown>>
} & ButtonProps

const ModalButton = ({ title, icon, ...props }: Props) => {
  return (
    <Button
      variant={'modal_button'}
      leftIcon={icon}
      {...props}
    >
      {title}
    </Button>
  );
};

export default ModalButton;