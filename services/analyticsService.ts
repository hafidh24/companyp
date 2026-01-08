
import { VisitorData } from '../types';

const ANALYTICS_KEY = 'company_test_analytics';

export const trackVisit = () => {
  const today = new Date().toISOString().split('T')[0];
  const data: VisitorData[] = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
  
  const todayEntry = data.find(entry => entry.date === today);
  
  if (todayEntry) {
    // Check if user has already visited in this session
    if (!sessionStorage.getItem('visited_today')) {
      todayEntry.count += 1;
      sessionStorage.setItem('visited_today', 'true');
    }
  } else {
    data.push({ date: today, count: 1 });
    sessionStorage.setItem('visited_today', 'true');
  }
  
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
};

export const getVisitorStats = (): VisitorData[] => {
  const data: VisitorData[] = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
  // Ensure we have last 7 days at least
  return data.slice(-7);
};

export const getTotalVisitors = (): number => {
  const data: VisitorData[] = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]');
  return data.reduce((acc, curr) => acc + curr.count, 0);
};
