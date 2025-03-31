import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Input, List, ListItem, useDisclosure } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Popover from '../../components/assets/ui/popover';
import PropertyIcon from './PropertyIcon';
import { PropertyTypes } from './PropertyRegistry';
import { AppDispatch } from '@/store';
import { addProperty } from '@/store/professorModule/course/course.thunk';

const AddNewProperty = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [search, setSearch] = useState('');
  const firstFieldRef = React.useRef(null);

  const items = useMemo(() => {
    return Object
      .keys(PropertyTypes)
      .filter((item) => item.includes(search.toLowerCase()));
  }, [search]);

  const createProperty = (type: keyof typeof PropertyTypes) => {
    dispatch(addProperty(type));
    onClose();
  };

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      initialFocusRef={firstFieldRef}
      flip={false}
      disclosureContent={
        <Button
          variant={'new_record'}
          leftIcon={<AddIcon boxSize={3}/>}
          size={'sm'}
        >
          Добавить новое свойство
        </Button>
      }
    >

      <Box margin={'4px 8px'}>
        <Input
          size={'sm'}
          marginBottom={2}
          placeholder="Поиск или создать новое свойство"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <List variant={'property_list'}>
          {items.map((item) => (
            <ListItem onClick={() => createProperty(item as keyof typeof PropertyTypes)}>
              <PropertyIcon
                type={PropertyTypes[item as keyof typeof PropertyTypes]}
                boxSize={3}
              />
              {item}
            </ListItem>
          ))}
        </List>

      </Box>
    </Popover>

  );
};

export default AddNewProperty;