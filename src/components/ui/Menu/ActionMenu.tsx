import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { CiMenuKebab } from 'react-icons/ci';
import Modal from '../modal';
import CustomMenuItem from './CustomMenuItem';
import { createActionType } from '@/actions';

type ActionMenuProps<T> = {
  actions: (el: T) => createActionType[]
  data?: T
}

const ActionMenu = <T,>({ actions, data }: ActionMenuProps<T>) => {
  const listActions = data && actions(data);

  return (
    <Menu size={'sm'}>
      <MenuButton
        as={IconButton}
        icon={<CiMenuKebab />}
        variant={'unstyled'}
        display={'flex'}
        justifyContent={'center'}
        onClick={(e) => e.stopPropagation()}
      />
      <MenuList>
        {listActions?.map((action) => (
          <Modal
            size="lg"
            key={action.id}
            action={
              <CustomMenuItem
                icon={action.icon}
                label={action.label}
                isDelete={action.isDeleted}
                isDisabled={action.isDisabled}
              />
            }
            renderBody={({ onClose = () => {} }) => action.children(onClose).content}
          />
        ))}
      </MenuList>
    </Menu>
  );
};

export default ActionMenu;
