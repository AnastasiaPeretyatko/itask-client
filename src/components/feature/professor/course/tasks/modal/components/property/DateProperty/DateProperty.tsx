import { Container, Divider, HStack, Input, useBoolean, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import WrapperDatePicker from './WrapperDatePicker';
import DatePicker from '@/components/ui/DatePicker/DatePicker';
import SwitchControl from '@/components/ui/SwitchControl/SwitchControl';
import Popover from '@/components/ui/popover';

type Props = {
  value: DateRange | Date | null
  onChange: (value: DateRange | Date) => void
}

const DateProperty = ({ value, onChange }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [endDate, setEndDate] = useBoolean(false);
  const [includeTime, setIncludeTime] = useBoolean(false);
  const [date, setDate] = useState<DateRange | Date>((value || new Date()) as Date);

  const isModal = true;

  const onChangeDate = (d: DateRange | Date) => {
    setDate(d);
  };

  const localeValueFrom = useMemo(() => {
    return endDate ? 'from' in date ? date.from : new Date() : new Date();
  }, [date, endDate]);

  const localeValueTo = useMemo(() => {
    return endDate ? 'to' in date ? date.to : new Date() : new Date();
  }, [date, endDate]);

  const localeValue = useMemo(() => {
    return !endDate && !('from' in date) ? date : new Date();
  }, [date, endDate]);

  const wasOpen = useRef(isOpen);

  useEffect(() => {
    // Если поповер закрылся, и он был открыт ранее
    if (wasOpen.current && !isOpen) {
      onChange?.(date);
    }

    // Обновляем предыдущее состояние
    wasOpen.current = isOpen;
  }, [isOpen, date, onChange]);

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      maxHeight={'unset'}
      contentStyle={{ width: '280px' }}
      disclosureContent={<Container
        variant={isModal ? 'property_modal' : 'property_card'}
        onClick={onOpen}
      >{(endDate ?
          `${localeValueFrom?.toLocaleDateString()} ⇾ ${localeValueTo?.toLocaleDateString()}`
          : localeValue.toLocaleDateString())
        }</Container>}
    >
      <VStack
        width={'full'}
        padding={1}
      >
        <HStack
          width={'full'}
          height={'28px'}
          paddingX={2}
          borderRadius={'md'}
          background={'button.neutral.bgDarker05'}
          boxShadow={'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset'}
        >
          <Input
            size={'sm'}
            variant={'unstyled'}
            value={endDate ? localeValueFrom?.toLocaleDateString() : localeValue?.toLocaleDateString()}
            onChange={() => {}}
          />
          {
            includeTime ? (
              <>
                <Divider
                  orientation="vertical"
                  height={'full'}
                  borderColor={'rgba(55, 53, 47, 0.09)'}
                />
                <Input
                  size={'sm'}
                  variant={'unstyled'}
                  value={localeValue.toLocaleTimeString()}
                  onChange={() => {}}
                />
              </>
            ) : null
          }
        </HStack>
        {
          endDate ? (
            <HStack
              width={'full'}
              height={'28px'}
              paddingX={2}
              borderRadius={'md'}
              background={'button.neutral.bgDarker05'}
              boxShadow={'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset'}
            >
              <Input
                size={'sm'}
                variant={'unstyled'}
                value={localeValueTo?.toLocaleDateString()}
                onChange={() => {}}
              />
              {
                includeTime ? (
                  <>
                    <Divider
                      orientation="vertical"
                      height={'full'}
                      borderColor={'rgba(55, 53, 47, 0.09)'}
                    />
                    <Input
                      size={'sm'}
                      variant={'unstyled'}
                      value={localeValue?.toLocaleTimeString()}
                      onChange={() => {}}
                    />
                  </>
                ) : null
              }
            </HStack>
          ) : null
        }

        <WrapperDatePicker>
          <DatePicker
            value={date}
            onChange={onChangeDate}
            mode={endDate ? 'range' : 'single'}
          />
        </WrapperDatePicker>
        <Divider />
        <SwitchControl
          id="end-date"
          label="Окончание"
          onChange={setEndDate.toggle}
          fontSize={'sm'}
        />
        <SwitchControl
          id="include-time"
          label="Включая время"
          onChange={setIncludeTime.toggle}
          fontSize={'sm'}
        />
      </VStack>
    </Popover>
  );
};

export default DateProperty;