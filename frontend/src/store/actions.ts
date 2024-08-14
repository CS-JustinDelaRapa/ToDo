import { Task } from "../types";

export const setTab = (tab: string) => ({
  type: 'SET_TAB',
  payload: tab,
});

export const setDate = (date: Date) => ({
  type: 'SET_DATE',
  payload: date,
});

export const setTasks = (tasks: Task[]) => ({
  type: 'SET_TASKS',
  payload: tasks,
});

export const setCompletedFilter = (isChecked: boolean) => ({
  type: 'SET_COMPLETED_FILTER',
  payload: isChecked,
});
