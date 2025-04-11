import { FormControl, FormLabel, Switch } from '@chakra-ui/react';

export type SwitchControl = {
  id: string;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  defaultChecked?: boolean;
  onChange: (value: boolean) => void;
  fontSize?: number | 'sm' | 'md' | 'lg' | 'small' | (string & {}) | 'xl' | '2xl' | '3xs' | '2xs' | 'xs' | '3xl';
}

const SwitchControl = ({ id, label, size = 'md', onChange, fontSize = 'sm', ...props }: SwitchControl) => {
  return (
    <FormControl
      display="flex"
      alignItems="center"
      width={'full'}
    >
      <FormLabel
        htmlFor={id}
        width={'full'}
        mb="0"
        cursor={'pointer'}
        fontSize={fontSize}
      >
        {label}
      </FormLabel>
      <Switch
        id={id}
        size={size}
        onChange={(e) => onChange(e.target.checked)}
        {...props}
      />
    </FormControl>
  );
};

export default SwitchControl;