import { Dispatch, SetStateAction } from 'react';
import { TaskModel } from '@/types/course.type';

export const CURRENT_DATE_VERSION = 2;

export type TDisabledDays = Date[] | { from: Date; to: Date }[];

export type TDatePicker = {
  /** use to apply modifications pertinent to date property */
  isProperty?: boolean;
  value: Date;
  /** show subscribe to notifications toggle */
  showSubscribeToggle?: boolean;
  onChange?: (value: any) => void;
  renderMode?: TRenderMode;
  setExpiration?: Dispatch<SetStateAction<TExpiration>>;
  disabled?: TDisabledDays;
  setIsWithEndDate?: Dispatch<SetStateAction<boolean>>;
  hideTimeToggle?: boolean;
  // readOnly?: boolean;
  // notifications?: { from: PropertyModel['shouldNotifyFrom']; to: PropertyModel['shouldNotifyTo'] };
  // document?: DocumentModel;
  task?: TaskModel
  modal?: boolean;
  // fontSize?: TFontSize;
  setValueToCopy?: (value: string) => void;
};

export type TRenderMode = 'inline' | 'popover';

export type TDateTimeObj = {
  date: TDateValue;
  time: TTimeValue;
};

export type TDateTime = {
  v: number;
  from: string;
  to: string;
};

export type TDateValue = {
  v: number;
  from: Date | string;
  to: Date | string;
};

export type TExpiration = {
  v?: number;
  from?: string;
  to?: string;
};

export type TTimeValue = {
  from: string | undefined;
  to: string | undefined;
};

export type DateValue = TDateTime | TDateTimeObj | string;

export type TselectedDates = {
  from: Date;
  to: Date | null;
};
