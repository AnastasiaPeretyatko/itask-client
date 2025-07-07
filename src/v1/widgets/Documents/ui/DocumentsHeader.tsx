import { Heading, HStack } from '@chakra-ui/react';
import React from 'react';
import DocumentCreateMenu from '@/v1/features/DocumentCreateMenu/DocumentCreateMenu';

const DocumentsHeader = () => {
  return (
    <HStack
      width={'100%'}
      mb={6}
    >
      <Heading
        size={'md'}
        flex={1}
      >Documents</Heading>
      <DocumentCreateMenu/>
    </HStack>
  );
};

export default DocumentsHeader;