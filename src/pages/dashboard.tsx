import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { KanbanIcon } from '@/components/icon';
import AppLayout from '@/components/layout/AppLayout';
import Board from '@/feature/view/board';
import { AppDispatch } from '@/store';
import { getStudentsAndTaskThunk } from '@/store/studentModule/tasks/dashboard.thunk';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log('kek');
    dispatch(getStudentsAndTaskThunk('d2a887e1-cfce-4f49-935a-1a77f9ff1169')); //TODO пока на бэке не достаем айди передаем дефолтный
  }, [dispatch]);

  return (
    <AppLayout>
      <Tabs
        variant={'dashboard'}
        size={'sm'}
        width={'full'}
        overflow={'hidden'}
        height={'full'}
      >
        <TabList>
          <Tab><KanbanIcon/> Kanban</Tab>
          {/* <Tab><TableIcon/> Table</Tab>
          <Tab><ListIcon/> List</Tab> */}
        </TabList>
        <TabIndicator
          mt="-2px"
          height="2px"
          bg="primary.purple"
          borderRadius="5px"
        />
        <TabPanels
          width={'full'}
          height={'full'}
        >
          <TabPanel
            width={'full'}
            height={'full'}
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