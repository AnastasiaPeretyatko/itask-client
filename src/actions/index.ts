import { ComponentWithAs, IconProps } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

export type createActionType = {
  id?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: (data: any) => string
  icon: ComponentWithAs<'svg', IconProps>
  label: string;
  children: (onClose: () => void) => {
    title: string
    content: JSX.Element
  }
  isDeleted?: boolean
  isDisabled?: boolean
}

export function createAction(definition: createActionType): createActionType {
  return {
    ...definition,
    id: uuidv4(),
  };
}
