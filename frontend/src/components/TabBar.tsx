import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setTab } from '../store/actions';

const TabBar: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state: RootState) => state.tab.selectedTab);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(setTab(newValue));
  };

  return (
    <Tabs value={selectedTab} onChange={handleChange} centered>
      <Tab label="Day" value="Day" />
      <Tab label="Week" value="Week" />
      <Tab label="Month" value="Month" />
    </Tabs>
  );
};

export default TabBar;
