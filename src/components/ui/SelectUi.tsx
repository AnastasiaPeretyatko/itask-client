import { Select } from '@chakra-ui/react';
import React from 'react';
import { OptionType } from '@/types/course.type';

type SelectProps = {
  options: OptionType[]
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectUi = ({ options, placeholder, onChange }: SelectProps) => {
  return (
    <Select
      placeholder={placeholder}
      onChange={onChange}
      size={'sm'}
      width={52}
      sx={{
        fontFamily: 'mono',
        borderRadius: 'lg',
        backgroundColor: 'blackAlpha.100',
        border: '1px solid',
        borderColor: 'blackAlpha.200',
        _focusVisible: {
          borderColor: 'blackAlpha.500',
          boxShadow: 'inherit',
        },
        _placeholder: {
          color: 'text.pale',
        },
      }}
    >
      {options.map((option) => (
        <option
          key={option.id}
          value={option.id}
        >
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default SelectUi;
