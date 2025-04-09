import { Container, Divider, HStack, Input, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { PropertyProps } from '..';
import WrapperDatePicker from './WrapperDatePicker';
import DatePicker from '@/components/assets/ui/DatePicker/DatePicker';
import SwitchControl from '@/components/assets/ui/SwitchControl/SwitchControl';
import Popover from '@/components/assets/ui/popover';

export type DateFieldType = PropertyProps;

const DateProperty = ({ task, property, onChange, mode }: DateFieldType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState<DateRange | Date>((task.values[property.id] || new Date()) as Date);
  const [endDate, setEndDate] = useState(false);
  const [includeTime, setIncludeTime] = useState(false);
  const isModal = mode === 'property';

  const onChangeDate = (date: DateRange | Date) => {
    setValue(date);
  };

  const localeValueFrom = useMemo(() => {
    return endDate ? 'from' in value ? value.from : new Date() : new Date();
  }, [value, endDate]);

  const localeValueTo = useMemo(() => {
    return endDate ? 'to' in value ? value.to : new Date() : new Date();
  }, [value, endDate]);

  const localeValue = useMemo(() => {
    return !endDate && !('from' in value) ? value : new Date();
  }, [value, endDate]);

  const wasOpen = useRef(isOpen);

  useEffect(() => {
    // Если поповер закрылся, и он был открыт ранее
    if (wasOpen.current && !isOpen) {
      onChange?.(value);
    }

    // Обновляем предыдущее состояние
    wasOpen.current = isOpen;
  }, [isOpen, value, onChange]);

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
            value={value}
            onChange={onChangeDate}
            mode={endDate ? 'range' : 'single'}
          />
        </WrapperDatePicker>
        <Divider />
        <SwitchControl
          id="end-date"
          label="Окончание"
          onChange={setEndDate}
          fontSize={'sm'}
        />
        <SwitchControl
          id="include-time"
          label="Включая время"
          onChange={setIncludeTime}
          fontSize={'sm'}
        />
      </VStack>
    </Popover>
  );
};

export default DateProperty;