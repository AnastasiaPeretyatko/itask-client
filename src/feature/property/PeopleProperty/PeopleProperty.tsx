import { Container } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PropertyProps } from '..';
import PeopleItem from './PeopleItem';
import PeopleOption from './PeopleOption';
import { Multiselect } from '@/components/assets/ui/multiselect/Multiselect';
import { OptionType } from '@/components/assets/ui/multiselect/Option';

export type PeopleOptionType = OptionType & {
  iconUrl?: string;
  isSuspended?: boolean;
  isDeleted?: boolean;
};

export type PeoplePropertyProps = {
  multiselect?: boolean;
} & PropertyProps;

const PeopleProperty = ({ task, property, multiselect }: PeoplePropertyProps) => {
  const [localValue, setLocalValue] = useState((task.values[property.id] || []) as string[]);
  const [options, setOptions] = useState<PeopleOptionType[]>([]);

  useEffect(() => {
    setOptions((property?.options as PeopleOptionType[]) ?? []);
  }, [property?.options]);

  useEffect(() => {
    setLocalValue((task.values[property.id] || []) as string[]);
  }, [property.id, task.values]);

  return (
    <Container variant={'property_modal'}>
      <Multiselect
        value={localValue}
        options={options}
        multiselect={multiselect}
        onChange={setLocalValue}
        propertyId={property.id}
        renderItem={<PeopleItem/>}
        renderOption={<PeopleOption/>}
        // canCreateOptions
      />
    </Container>
  );
};

export default PeopleProperty;