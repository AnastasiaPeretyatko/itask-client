import { Flex, Input, List, ListItem, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import Popover from '../popover';

type SelectProps<T> = {
  renderItem: React.ElementType
  renderOption: React.ElementType
  options: T[]
  localValue: T
  onChange: (option: T) => void
}

const Select = <T,>({ localValue, options, renderItem, renderOption, onChange }: SelectProps<T>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');

  const items = useMemo(() => {
    return options.filter((option) => option.name.toLowerCase().includes(search.toLowerCase()));
  }, [options, search]);

  const rest = {
    onChange,
    onClose,
  };

  const ComponentItem = renderItem;

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      disclosureContent={
        <Flex
          width={'full'}
          flexWrap={'wrap'}
          align={'center'}
          padding={1}
          cursor={'pointer'}
          borderRadius={'md'}
          _hover={{
            background: 'button.neutral.bgDarker05',
          }}
        >
          {
            localValue ? (
              <ComponentItem
                option={localValue}
                {...rest}
              />
            ) : null
          }
        </Flex>
      }
    >
      <VStack align={'start'}>
        <Input
          size={'sm'}
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <List
          width={'100%'}
          variant={'property_list'}
        >
          {
            items.map((option, index) => {
              const ComponentOption = renderOption;
              return (
                <ListItem
                  width={'full'}
                  onClick={() => {
                    onChange(option);
                    onClose();
                  }}
                >
                  <ComponentOption
                    key={index}
                    option={option}
                    {...rest}
                  />
                </ListItem>
              );
            })
          }
        </List>

      </VStack>
    </Popover>
  );
};

export default Select;