import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { KanbanIcon } from '@/components/icon';
import AppLayout from '@/components/layout/AppLayout';
import Board from '@/feature/view/board';
import { AppDispatch, RootState } from '@/store';
import { getStudentsAndTaskThunk } from '@/store/studentModule/tasks/dashboard.thunk';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if(!user?.studentId) {return;}
    dispatch(getStudentsAndTaskThunk({ id: user?.studentId }));
  }, [dispatch, user?.studentId]);

  return (
    <AppLayout>
      <Tabs
        variant={'dashboard'}
        size={'sm'}
        width={'full'}
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