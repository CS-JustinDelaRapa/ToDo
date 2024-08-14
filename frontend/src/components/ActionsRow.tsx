import React, { useState } from 'react';
import { Button, IconButton, Menu, MenuItem, Checkbox, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { Task } from '../types';
import axios from '../axios';
import { setTasks, setCompletedFilter } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import TaskModal from './TaskModal';

const ActionsRow: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const completedItems = useSelector((state: RootState) => state.filter.completedItems);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCompletedFilter(event.target.checked));
  };

  const handleSave = (task: Task) => {
    axios.post('/todo', task)
      .then(response => {
        dispatch(setTasks([...tasks, response.data]));
      })
      .catch(error => console.error('Error creating task:', error));
  };

  return (
    <div style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 auto', paddingTop: "10vh" }}>
      <Button 
        variant="contained" 
        color="primary"
        onClick={() => setModalOpen(true)}
        startIcon={<AddIcon />}>
        Create Task
      </Button>
      <div>
        <IconButton onClick={handleClick} color="inherit">
          <FilterListIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem>
            <Checkbox
              checked={completedItems}
              onChange={handleCheckboxChange}
            />
            <Typography variant="body2">Completed Items</Typography>
          </MenuItem>
        </Menu>
      </div>
      <TaskModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
        }}
        onSave={handleSave}
        mode={'create'}
      />
    </div>
  );
};

export default ActionsRow;
