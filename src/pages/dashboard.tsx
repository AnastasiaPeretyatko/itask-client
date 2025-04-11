import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { KanbanIcon, ListIcon, TableIcon } from '@/components/icon';
import AppLayout from '@/components/layout/AppLayout';
import Board from '@/feature/view/board';

const Dashboard = () => {
  return (
    <AppLayout>
      <Tabs
        variant={'dashboard'}
        size={'sm'}
      >
        <TabList>
          <Tab><KanbanIcon/> Kanban</Tab>
          <Tab><TableIcon/> Table</Tab>
          <Tab><ListIcon/> List</Tab>
        </TabList>
        <TabIndicator
          mt="-2px"
          height="2px"
          bg="primary.purple"
          borderRadius="5px"
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