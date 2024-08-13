import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { config } from ".";

const theme = extendTheme({
  config,
  styles: {
  },
  colors: {
    PRIMARY_BLUE: '#2A85FF',
    PRIMARY_GREEN: '#83BF6E',
    PRIMARY_ORANGE: '#FF6A55',
    PRIMARY_PURPLE: '#8E59FF',

    SECONDARY_BLUE: '#B1E5FC',
    SECONDARY_GREEN: '#B5E4CA',
    SECONDARY_ORANGE: '#FFBC99',
    SECONDARY_PURPLE: '#CABDFF',

    BLACK_100: '#111315',
    BLACK_200: '#1A1D1F',
    BLACK_300: '#272B30',
    BLACK_400: '#303336',
  },
  components: {},
})

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export function ThemeProvider({ children }: Props) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
