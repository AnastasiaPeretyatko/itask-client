import { ReactElement, ReactNode } from 'react';

export type OptionType<T = unknown> = T & {
  id: string;
  label: string;
  color?: string;
  withoutOpacity?: boolean;
  icon?: ReactNode | ReactElement;
  showDocumentIcon?: boolean
};

const Option = () => {
  return (
    <div>Option</div>
  );
};

export default Option;