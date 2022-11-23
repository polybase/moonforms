import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';
const colorsConfig = {
  dark: {
    1: '#1F2122',
  },
  yellow: {
    5: '#FDFFAF',
  },
  green: {
    '05': '#C0F7EA',
    1: '#AAEEDF',
    2: '#80DEC8',
    3: '#55CDB2',
    4: '#2BBD9B',
    5: '#00AC85',
    6: '#008A6A',
    7: '#006750',
    8: '#004535',
  },
  purple: {
    '05': '#F0EEFF',
    1: '#E1DCFF',
    2: '#C3B9FF',
    3: '#A497FF',
    4: '#8674FF',
    5: '#6851FF',
    6: '#5441D4',
  },
};

export const theme = extendTheme({
  colors: colorsConfig,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: 'default',
        bg: '#18191A',
      },
    }),
  },
  fonts: {
    heading: `"IBM Plex Sans", sans-serif`,
    body: `"IBM Plex Sans", sans-serif;`,
  },
  // 'Poppins', sans-serif
});
