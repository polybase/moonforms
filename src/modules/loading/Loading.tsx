import {Center, Spinner, SpinnerProps, Text, VStack} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

export interface LoadingProps extends SpinnerProps {
  loading?: boolean;
  center?: boolean;
  delay?: number;
}

export const Loading: React.FC<LoadingProps> = ({
  loading,
  center,
  children,
  delay = 100,
  ...props
}) => {
  const [localLoading, setLocalLoading] = useState<boolean | null>(null);
  const timer = useRef<null | number>(null);

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    if (!loading || !delay) {
      setLocalLoading(!!loading);
    } else {
      timer.current = window.setTimeout(() => {
        setLocalLoading(!!loading);
      }, delay);
    }
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [loading, delay]);

  if (localLoading) {
    if (center) {
      return (
        <Center mt={40}>
          <VStack>
            <Spinner
              thickness='5px'
              speed='0.65s'
              emptyColor='white'
              color='dark.1'
              size='xl'
            />
            <Text fontSize={'2xl'} fontWeight={600} color={'white'}>Loading...</Text>
          </VStack>
        </Center>
      );
    }
    return (
      <Spinner emptyColor='gray.200' color='blue.500' size='md' {...props} />
    );
  }

  if (localLoading === null) return null;

  return <>{children}</>;
};
