
import { Activity } from '../types';
import { INITIAL_ACTIVITIES } from '../constants';

const ACTIVITIES_KEY = 'company_test_activities';

export const getActivities = (): Activity[] => {
  const stored = localStorage.getItem(ACTIVITIES_KEY);
  if (!stored) {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(INITIAL_ACTIVITIES));
    return INITIAL_ACTIVITIES;
  }
  return JSON.parse(stored);
};

export const addActivity = (activity: Omit<Activity, 'id'>) => {
  const activities = getActivities();
  const newActivity = { ...activity, id: Date.now().toString() };
  activities.unshift(newActivity);
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
  return newActivity;
};

export const updateActivity = (updated: Activity) => {
  const activities = getActivities();
  const index = activities.findIndex(a => a.id === updated.id);
  if (index !== -1) {
    activities[index] = updated;
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
  }
};

export const deleteActivity = (id: string) => {
  const activities = getActivities().filter(a => a.id !== id);
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
};
