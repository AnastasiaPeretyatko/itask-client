import { ComponentWithAs, IconProps, MenuItem, Text } from '@chakra-ui/react';

type Props = {
  label?: string
  icon?: ComponentWithAs<'svg', IconProps>
  onClick?: () => void
  isDelete?: boolean
  isDisabled?: boolean
}

const CustomMenuItem = ({
  label,
  icon,
  onClick,
  isDelete,
  isDisabled,
}: Props) => {
  const ComponentIcon = icon as ComponentWithAs<'svg', IconProps>;

  return (
    <MenuItem
      isDisabled={isDisabled}
      data-danger={isDelete ? 'true' : undefined}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <ComponentIcon boxSize={3} />
      <Text>{label}</Text>
    </MenuItem>
  );
};

export default CustomMenuItem;
