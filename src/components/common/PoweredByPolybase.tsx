import { HStack, Image, Link as ChakraLink, Text } from '@chakra-ui/react'
import React from 'react'

const PoweredByPolybase = () => {
  return (
    <ChakraLink href='https://polybase.xyz' isExternal>
      <HStack>
        <Text color='gray.500'>
          Powered by
        </Text>
        <Image src='/polybase-lockup-white.svg' alt='Polybase web3 database' height='24px' />
      </HStack>
    </ChakraLink>
  )
}

export default PoweredByPolybase