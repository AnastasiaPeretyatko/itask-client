import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { DotsVerticalIcon } from '@/components/icon';

const MenuMessage = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<DotsVerticalIcon />}
        variant={'unstyled'}
      />
      <MenuList fontSize={'sm'}>
        <MenuItem>Удалить</MenuItem>
        <MenuItem>Заблокировать</MenuItem>
        <MenuItem>Пометить как прочитанное</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuMessage;