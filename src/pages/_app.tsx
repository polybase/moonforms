import { ColorModeProvider } from '@chakra-ui/color-mode';
import { ChakraProvider } from '@chakra-ui/react';
import { Polybase } from '@polybase/client';
import { PolybaseProvider } from '@polybase/react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import '@fontsource/lora/400.css';

import { AuthProvider } from '../features/users/AuthProvider';
import { theme } from '../styles/theme';

const polybase = new Polybase({ defaultNamespace: 'formsTesting_3' });
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
