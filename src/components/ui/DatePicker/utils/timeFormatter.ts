import { format, parse } from 'date-fns';
import { CURRENT_DATE_VERSION, TDateTime, TDateTimeObj, DateValue } from '../types';

export function formatDateTime(date?: Date, time?: string) {
  if (!date) {
    return '';
  }

  let formattingDate = format(new Date(date), 'yyyy-MM-dd');

  // if (isMac()) {
  //   /** safari fix */
  formattingDate = formattingDate.replace(/-/g, '/');
  // }

  if (!time) {
    return formattingDate;
  }

  return new Date(`${formattingDate} ${time}`).toISOString();
}

export function getDateTimeFromValue(value: DateValue): TDateTime {
  const localValue = value;
  if (!localValue) {
    return {
      v: CURRENT_DATE_VERSION,
      from: '',
      to: '',
    };
  }

  if (typeof localValue === 'string') {
    let from: Date | null = null;

    try {
      if (localValue.includes('-')) {
        from = parse(localValue, 'yyyy-MM-dd', new Date());
      } else if (localValue.includes('.')) {
        from = parse(localValue, 'dd.MM.yyyy', new Date());
      } else if (localValue.includes('T')) {
        from = new Date(localValue);
      }

      if (String(from) === 'Invalid Date') {
        throw new Error('Сan not be converted to the correct date format');
      }
    } catch (e) {
      console.warn(`Date migrating error for ${localValue}`, e);
      from = null;
    }

    if (from) {
      return {
        v: CURRENT_DATE_VERSION,
        from: from.toISOString(),
        to: '',
      };
    }
  }

  if (Object.keys(localValue).length === 0 || (localValue as TDateTime).v) {
    return localValue as TDateTime;
  }

  // old version
  const { date, time } = localValue as TDateTimeObj;

  if (!date) {
    return {
      v: CURRENT_DATE_VERSION,
      from: '',
      to: '',
    };
  }

  const dateTime: TDateTime = {
    v: CURRENT_DATE_VERSION,
    from: date.from ? format(new Date(date.from), 'yyyy-MM-dd') : '',
    to: date.to ? format(new Date(date.to), 'yyyy-MM-dd') : '',
  };

  if (time && Object.keys(time).length) {
    return {
      ...dateTime,
      from: new Date(`${dateTime.from} ${time.from}`).toISOString(),
      to: time.to ? new Date(`${dateTime.to} ${time.to}`).toISOString() : dateTime.to,
    };
  }

  return dateTime;
}

export function getTimeFromDate(date?: Date | string) {
  if (!date) {
    return undefined;
  }

  return String(date).indexOf('Z') !== -1 ? new Date(date).toLocaleTimeString(undefined, { hour12: false, hour: '2-digit', minute: '2-digit' }) : undefined;
}

export function toTimezone(date: string) {
  /**
   * js Date is 1 day off in certain TMZ's if spaced with "-" instead of "/"
   * more info here: https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
   */
  const newDate = date.replace(/-/g, '/').replace('T', '/');

  /** нужна лишь дата без времени */
  return newDate.slice(0, 10);
}
