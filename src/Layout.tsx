import { Container, Heading } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Container maxW="2xl" centerContent>
      <Heading marginBottom={50}>weight4it</Heading>
      {children}
    </Container>
  );
}
