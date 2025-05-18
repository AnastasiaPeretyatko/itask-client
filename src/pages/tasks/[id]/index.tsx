import { HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';

const TaskPage = () => {
  const router = useRouter();
  return (
    <AppLayout>
      <HStack>

      </HStack>
    </AppLayout>
  );
};

export default TaskPage;