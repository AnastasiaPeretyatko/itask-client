import { Avatar, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { PeopleOptionType } from './PeopleProperty';
import { OptionType } from '@/components/assets/ui/multiselect/Option';
import { OptionItemProps } from '@/components/assets/ui/multiselect/OptionItem';

type Props = Omit<OptionItemProps<PeopleOptionType>, 'option'> & {
  option?: OptionType<PeopleOptionType>;
}


const PeopleItem = ({ option, ...props }: Props) => {
  return (
    <HStack
      width={'full'}
      height={'full'}
      {...props}
    >
      <Avatar size={'xs'}/>
      <Text size={'sm'}>Вася Пупкин</Text>
    </HStack>
  );
};

export default PeopleItem;