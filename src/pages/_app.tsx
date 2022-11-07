import { ColorModeProvider } from '@chakra-ui/color-mode';
import { ChakraProvider } from '@chakra-ui/react';
import { Polybase } from '@polybase/client';
import { PolybaseProvider } from '@polybase/react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

import { AuthProvider } from '../features/users/AuthProvider';
import { theme } from '../styles/theme';

const polybase = new Polybase();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PolybaseProvider polybase={polybase}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <ColorModeProvider>
            <Component {...pageProps} />
          </ColorModeProvider>
        </ChakraProvider>
      </AuthProvider>
    </PolybaseProvider>
  );
}

export default MyApp;
