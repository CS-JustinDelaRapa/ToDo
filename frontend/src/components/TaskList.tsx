import React, { useEffect, useState } from 'react';
import { Box, Checkbox, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import { RootState } from '../store';
import { Task } from '../types';
import { setTasks } from '../store/actions';
import TaskModal from './TaskModal'; // Import the TaskModal component
import { endOfMonth, endOfWeek, format, startOfDay, startOfMonth, startOfWeek } from 'date-fns';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const completedItems = useSelector((state: RootState) => state.filter.completedItems);
  const selectedTab = useSelector((state: RootState) => state.tab.selectedTab);
  const currentDate = useSelector((state: RootState) => state.tab.currentDate);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = React.useState<Task | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');

  useEffect(() => {
    let startDate, endDate;
  
    switch (selectedTab) {
      case 'Day':
        startDate = startOfDay(currentDate);
        endDate = startDate;
        break;
      case 'Week':
        startDate = startOfWeek(currentDate);
        endDate = endOfWeek(currentDate);
        break;
      case 'Month':
        startDate = startOfMonth(currentDate);
        endDate = endOfMonth(currentDate);
        break;
      default:
        startDate = startOfDay(currentDate);
        endDate = startOfDay(currentDate);
    }
  
    const queryParams = new URLSearchParams({
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
    });
  
    if (completedItems) {
      queryParams.append('isDone', 'true');
    }
  
    axios.get(`/todo?${queryParams}`)
      .then(response => {
        dispatch(setTasks(response.data));
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, [dispatch, completedItems, selectedTab, currentDate]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, task: Task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedTask(undefined);
  };

  const handleEdit = () => {
    if (selectedTask) {
      setModalMode('edit');
      setModalOpen(true);
    }
  };

  const handleDelete = () => {
    if (selectedTask) {
      axios.delete(`/todo/${selectedTask._id}`)
        .then(() => {
          const updatedTasks = tasks.filter((task: Task) => task._id !== selectedTask._id);
          dispatch(setTasks(updatedTasks));
        })
        .catch(error => console.error('Error deleting task:', error));
    }
    handleCloseMenu();
  };

  const handleCheckboxChange = (task: Task) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTask = { ...task, isDone: event.target.checked };

    axios.patch(`/todo/${task._id}`, { isDone: updatedTask.isDone })
      .then(() => {
        const updatedTasks = tasks.map((t: Task) =>
          t._id === task._id ? updatedTask : t
        );
        dispatch(setTasks(updatedTasks));
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const open = Boolean(anchorEl);

  const handleSave = (task: Task) => {
    if (modalMode === 'edit') {
      axios.patch(`/todo/${task._id}`, task)
        .then(() => {
          const updatedTasks = tasks.map((t: Task) =>
            t._id === task._id ? task : t
          );
          dispatch(setTasks(updatedTasks));
        })
        .catch(error => console.error('Error updating task:', error));
    }
  };

  return (
    <div style={{ width: '60%', alignItems: 'center', justifyContent: 'space-between', margin: '0 auto', paddingTop: "10vh" }}>
      {tasks.map((task: Task) => (
        <Box
          key={task._id}
          sx={{
            padding: 1,
            alignItems: 'center',
            width: '100%',
            borderBottom: '1px solid #ddd',
            backgroundColor: 'transparent',
            display: 'flex'
          }}
        >
          <Box sx={{width: '15%'}}>
            <Checkbox
              checked={task.isDone}
              onChange={handleCheckboxChange(task)}
            />
          </Box>
          <Box sx={{width: '80%' }}>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                cursor: 'pointer'
              }}
              onClick={() => {
                setModalMode('view');
                setSelectedTask(task);
                setModalOpen(true);
              }}
            >
              {task.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                cursor: 'pointer'
              }}
              onClick={() => {
                setModalMode('view');
                setSelectedTask(task);
                setModalOpen(true);
              }}
            >
              {task.description}
            </Typography>
          </Box>
          <Box sx={{width: '5%'}}>
            <IconButton
              onClick={(event) => handleMenuClick(event, task)}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={open && selectedTask === task}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </Box>
      ))}

      {/* Render TaskModal for viewing/editing tasks */}
      <TaskModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          handleCloseMenu()
        }}
        onSave={handleSave}
        task={selectedTask}
        mode={modalMode}
      />
    </div>
  );
};

export default TaskList;
