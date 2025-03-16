import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { KanbanIcon, ListIcon, TableIcon } from '@/components/assets/icon';
import AppLayout from '@/components/layout/AppLayout';
import Board from '@/feature/view/board';

const Dashboard = () => {
  return (
    <AppLayout>
      <Tabs
        width={'full'}
        padding={3}
        position="relative"
        variant="unstyled"
        size={'sm'}
      >
        <TabList>
          <Tab><KanbanIcon mr={2}/> Kanban</Tab>
          <Tab><TableIcon mr={2}/> Table</Tab>
          <Tab><ListIcon mr={2}/> List</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels
          width={'full'}
        >
          <TabPanel
            width={'full'}
            padding={0}
            paddingTop={2}
          >
            <Board/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  );
};

export default Dashboard;