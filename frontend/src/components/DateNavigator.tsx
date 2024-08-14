import React from 'react';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setDate } from '../store/actions';
import { format, addDays, subDays, startOfWeek, endOfWeek, addWeeks, subWeeks, isToday } from 'date-fns';

const DateNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedTab, currentDate } = useSelector((state: RootState) => state.tab);

  const handleNext = () => {
    let newDate: Date;
    switch (selectedTab) {
      case 'Day':
        newDate = addDays(currentDate, 1);
        break;
      case 'Week':
        newDate = addWeeks(currentDate, 1);
        break;
      case 'Month':
        newDate = addWeeks(currentDate, 4);
        break;
      default:
        newDate = currentDate;
    }
    dispatch(setDate(newDate));
  };

  const handlePrevious = () => {
    let newDate: Date;
    switch (selectedTab) {
      case 'Day':
        newDate = subDays(currentDate, 1);
        break;
      case 'Week':
        newDate = subWeeks(currentDate, 1);
        break;
      case 'Month':
        newDate = subWeeks(currentDate, 4);
        break;
      default:
        newDate = currentDate;
    }
    dispatch(setDate(newDate));
  };

  const handleToday = () => {
    dispatch(setDate(new Date()));
  };

  const renderDateText = () => {
    switch (selectedTab) {
      case 'Day':
        return (
          <>
            <Typography variant="h6" textAlign="center">{format(currentDate, 'EEEE')}</Typography>
            <Typography variant="body2" textAlign="center">{format(currentDate, 'MMMM do, yyyy')}</Typography>
            {selectedTab === 'Day' && !isToday(currentDate) && (
              <div onClick={handleToday} style={{ cursor: 'pointer', paddingTop: '10px'}}>
                <Typography variant="body2" textAlign="center" sx={{color: '#F6C900'}}>Today</Typography>
              </div>
            )}
          </>
        );
      case 'Week':
        const weekStart = startOfWeek(currentDate);
        const weekEnd = endOfWeek(currentDate);
        return (
          <>
            <Typography variant="h6" textAlign="center">{format(currentDate, "'Week' w")}</Typography>
            <Typography variant="body2" textAlign="center">{`${format(weekStart, 'MMMM do')} - ${format(weekEnd, 'MMMM do, yyyy')}`}</Typography>
          </>
        );
      case 'Month':
        return (
          <>
            <Typography variant="h6" textAlign="center">{format(currentDate, 'MMMM')}</Typography>
            <Typography variant="body2" textAlign="center">{format(currentDate, 'yyyy')}</Typography>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '1rem' }}>
      <Button 
        variant="contained"
        onClick={handlePrevious}>
        Previous
      </Button>
      <div>{renderDateText()}</div>
      <Button 
        variant="contained"
        onClick={handleNext}>
        Next
      </Button>
    </div>
  );
};

export default DateNavigator;