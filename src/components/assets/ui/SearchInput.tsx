import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'

type SearchInputProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  width?: number | 'full'
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
}

const SearchInput = ({
  size = 'sm',
  onChange,
  placeholder,
  value,
  width = 72,
}: SearchInputProps) => {
  return (
    <InputGroup width={width} variant={'search'}>
      <Input
        size={size}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      <InputRightElement height={'100%'}>
        <SearchIcon />
      </InputRightElement>
    </InputGroup>
  )
}

export default SearchInput
