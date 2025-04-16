import { Container } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const WrapperDatePicker = ({ children }: PropsWithChildren) => {
  return (
    <Container
      width={'100%'}
      height={'min-content'}
      paddingTop={2}
      sx={{
        '.rdp-nav': {
          height: 'unset',
          '& button': {
            width: 5,
            height: 5,
            '.rdp-chevron': {
              fill: '#37352fd9',
            },
          },
        },
        '.rdp-months': {
          width: '100%',
          maxWidth: '100%',
        },
        '.rdp-month': {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        '.rdp-month_caption': {
          fontWeight: 500,
          fontSize: 'sm',
          height: 'unset',
        },
        '.rdp-month_grid': {
          maxWidth: '100%',
        },
        '.rdp-day': {
          borderRadius: 'none',
          '&.rdp-range_start, &.rdp-range_middle': {
            backgroundColor: 'transparent',
          },
          '&.rdp-today': {
            '& .rdp-day_button': {
              border: 'none',
              borderRadius: 'full',
              backgroundColor: 'red.400',
              color: 'white',
            },
          },
          '&.rdp-selected': {
            '&.rdp-range_middle': {
              '& .rdp-day_button': {
                border: 'none',
                backgroundColor: 'blue.100',
                color: 'white',
              },
            },
            '& .rdp-day_button': {
              border: 'none',
              color: 'white',
              borderRadius: 'md',
              backgroundColor: 'blue.400',
            },
          },
          '.rdp-day_button': {
            width: '32px',
            height: '32px',
            fontSize: 'sm',
          },
        },
      }}
    >
      {children}
    </Container>
  );
};

export default WrapperDatePicker;