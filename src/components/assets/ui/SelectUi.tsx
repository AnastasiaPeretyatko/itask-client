import { Select } from '@chakra-ui/react'
import React from 'react'

type SelectProps = {
  options: {
    id: string
    name: string
  }[]
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
      }}
    >
      {options.map((option, index) => (
        <option key={index} value={option.id}>
          {option.name}
        </option>
      ))}
    </Select>
  )
}

export default SelectUi
