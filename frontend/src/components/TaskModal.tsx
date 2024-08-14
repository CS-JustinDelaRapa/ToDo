import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { Task } from '../types';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (task: Task) => void; // Callback for save action
  task?: Task; // Optional prop for editing or viewing
  mode: 'view' | 'edit' | 'create'; // Mode determines if the modal is for viewing, editing, or creating
}

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, onSave, task, mode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<string>('');
  const [isDone, setIsDone] = useState(false);

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (task && mode !== 'create') {
      const date = new Date(task.date); // Convert the ISO string to a Date object
      const formattedDate = date.toISOString().split('T')[0]; 

      setTitle(task.title);
      setDescription(task.description);
      setDate(formattedDate);
      setIsDone(task.isDone);
    } else {
      resetForm();
    }
  }, [task, mode]);

  const handleSave = () => {
    // Reset errors
    setTitleError('');
    setDescriptionError('');
    setDateError('');

    // Validate fields
    let valid = true;

    if (!title) {
      setTitleError('Title is required');
      valid = false;
    }

    if (!description) {
      setDescriptionError('Description is required');
      valid = false;
    }

    if (!date) {
      setDateError('Date is required');
      valid = false;
    }

    // If all fields are valid, proceed to save
    if (valid) {
      onSave?.({
        _id: task?._id, // Include _id only if editing an existing task
        title,
        description,
        date: new Date(date),
        isDone,
      });
      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setIsDone(false);
    setTitleError('');
    setDescriptionError('');
    setDateError('');
  };

  return (
    <Modal 
      open={open}
      onClose={() => {
          onClose();
          resetForm();
        }
      }
    >
      <Box
        sx={{
          width: '400px',
          margin: 'auto',
          marginTop: '10%',
          padding: 3,
          backgroundColor: '#343434',
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {mode === 'edit' ? 'Edit Task' : mode === 'create' ? 'Create Task' : 'View Task'}
        </Typography>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{ readOnly: mode === 'view' }}
          error={!!titleError}
          helperText={titleError}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputProps={{ readOnly: mode === 'view' }}
          error={!!descriptionError}
          helperText={descriptionError}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputProps={{
            readOnly: mode === 'view',
            sx: {
              '& .MuiInputAdornment-root': {
                color: 'white',
              },
              '& .MuiSvgIcon-root': {
                color: 'white',
              },
            },
          }}
          error={!!dateError}
          helperText={dateError}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isDone}
              onChange={(e) => setIsDone(e.target.checked)}
              sx={{
                color: 'white',
                '&.Mui-disabled': {
                  color: 'white',
                },
              }}
            />
          }
          label={
            <Typography
              sx={{
                color: 'white',
                '&.Mui-disabled': {
                  color: 'white',
                },
              }}
            >
              Completed
            </Typography>
          }
          disabled={mode === 'view'}
          sx={{
            color: 'white',
          }}
        />
        {(mode === 'edit' || mode === 'create') && (
          <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onClose} variant="outlined" sx={{ marginRight: 1, color: 'white' }}>
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default TaskModal;
