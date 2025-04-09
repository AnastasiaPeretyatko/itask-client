import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  width?: number | 'full'
  label: string
  placeholder?: string
  type?: 'text' | 'password' | 'email'
  register: UseFormRegisterReturn<string>
}

const InputForm = ({
  label,
  placeholder,
  size,
  width = 'full',
  type = 'text',
  register,
}: InputProps) => {
  const [typeInput, setTypeInput] = useState(type);

  const passwordElement = useMemo(() => {
    if (type === 'password') {
      return (
        <InputRightElement height={'100%'}>
          <IconButton
            variant="unstyled"
            aria-label="show password"
            icon={typeInput === 'password' ? <ViewOffIcon /> : <ViewIcon />}
            onClick={() =>
              setTypeInput(typeInput === 'password' ? 'text' : 'password')
            }
          />
        </InputRightElement>
      );
    }
  }, [type, typeInput]);

  return (
    <FormControl size={size}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          width={width}
          type={typeInput}
          placeholder={placeholder}
          {...register}
        />
        {passwordElement}
      </InputGroup>
      <FormHelperText>We&apos;ll never share your email.</FormHelperText>
    </FormControl>
  );
};

export default InputForm;
