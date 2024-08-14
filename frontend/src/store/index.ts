import { createStore, combineReducers } from 'redux';
import { Task } from '../types';

const tabInitialState = {
  selectedTab: 'Month',
  currentDate: new Date(),
};

const tabReducer = (state = tabInitialState, action: any) => {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, selectedTab: action.payload };
    case 'SET_DATE':
      return { ...state, currentDate: action.payload };
    default:
      return state;
  }
};

const tasksInitialState: Task[] = [];

const tasksReducer = (state = tasksInitialState, action: any) => {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload;
    default:
      return state;
  }
};

const filterInitialState = {
  completedItems: false,
};

const filterReducer = (state = filterInitialState, action: any) => {
  switch (action.type) {
    case 'SET_COMPLETED_FILTER':
      return { ...state, completedItems: action.payload };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  tab: tabReducer,
  tasks: tasksReducer,
  filter: filterReducer,
});

export const store = createStore(rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
