import { ColorModeProvider } from '@chakra-ui/color-mode';
import { ChakraProvider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Polybase } from '@polybase/client';
import { PolybaseProvider } from '@polybase/react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

import { AuthProvider } from '../features/users/AuthProvider';
import { theme } from '../styles/theme';

const polybase = new Polybase({ defaultNamespace: 'new-forms' });
const AppContainer = styled.div`
  font-family: 'Poppins', sans-serif;
`;
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PolybaseProvider polybase={polybase}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <ColorModeProvider>
            <AppContainer>
              <Component {...pageProps} />
            </AppContainer>
          </ColorModeProvider>
        </ChakraProvider>
      </AuthProvider>
    </PolybaseProvider>
  );
}

export default MyApp;
