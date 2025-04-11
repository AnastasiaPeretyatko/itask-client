/* eslint-disable react/jsx-no-leaked-render */
import { Container, Divider, HStack, Input, useBoolean, useDisclosure, VStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import WrapperDatePicker from './WrapperDatePicker';
import DatePicker from '@/components/ui/DatePicker/DatePicker';
import SwitchControl from '@/components/ui/SwitchControl/SwitchControl';
import Popover from '@/components/ui/popover';

type ValueProp = {
  from: Date | null;
    to: Date | null;
}

type Props = {
  value: ValueProp
  onChange: (value: ValueProp) => void
  readOnly?: boolean
}

const DateProperty = ({ value, onChange, readOnly }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [endDate, setEndDate] = useBoolean(false);
  const [includeTime, setIncludeTime] = useBoolean(false);
  const [date, setDate] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: value.from || new Date(),
    to: value.to || undefined,
  });

  const isModal = true;

  const onChangeDate = (d: DateRange | Date) => {
    if ('from' in d && 'to' in d) {
      setDate({ from: d.from, to: d.to });
    } else if (d instanceof Date) {
      setDate({ from: d, to: undefined });
    }
  };

  const wasOpen = useRef(isOpen);

  useEffect(() => {
    // Если поповер закрылся, и он был открыт ранее
    if (wasOpen.current && !isOpen) {
      // if(!date.from && !date.to) {
      //   console.log('1',{ date });
      //   onChange({ from: date.from || null, to: date.to || null });
      // } else {
      //   console.log('2',{ date });
      onChange({ from: date.from || null, to: date.to || null });
      // }

    }

    // Обновляем предыдущее состояние
    wasOpen.current = isOpen;
  }, [isOpen, date, onChange]);

  return (
    <Popover
      isOpen={!readOnly && isOpen}
      onClose={onClose}
      onOpen={onOpen}
      maxHeight={'unset'}
      contentStyle={{ width: '280px' }}
      disclosureContent={<Container
        variant={isModal ? 'property_modal' : 'property_card'}
        onClick={onOpen}
      >
        { new Date(date.from || new Date()).toLocaleDateString() }
        { date.to && new Date(date.from || new Date()).toLocaleDateString() ? ' ⇾ ' + new Date(date.to || new Date()).toLocaleDateString() : null }
      </Container>}
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
            value={new Date(date.from || new Date()).toLocaleDateString()}
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
                  value={new Date(date.from || new Date()).toLocaleDateString()}
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
                value={new Date(date.to || new Date()).toLocaleDateString()}
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
                      value={new Date(date.to || new Date()).toLocaleDateString()}
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
            value={endDate ? date : date.from}
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