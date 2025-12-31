import { Goal, GoalStatus } from '@/types/goals';

export const getStatusColor = (status: GoalStatus): string => {
  const colors = {
    'not-started': 'bg-slate-100 text-slate-700 border-slate-300',
    'in-progress': 'bg-emerald-100 text-emerald-700 border-emerald-300',
    'completed': 'bg-green-100 text-green-700 border-green-300',
    'paused': 'bg-amber-100 text-amber-700 border-amber-300',
  };
  return colors[status];
};

export const getCategoryColor = (category: string): string => {
  // Align with frontend theme (#22ae4b green family)
  const colors: Record<string, string> = {
    fitness: '#22ae4b',
    nutrition: '#1c9a40',
    'mental-health': '#34d399',
    sleep: '#059669',
    hydration: '#0d9488',
    other: '#14b8a6',
  };
  return colors[category] || '#22ae4b';
};

export const calculateProgress = (current: number, target: number): number => {
   if (!target || target <= 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
};

export const getDaysRemaining = (targetDate: string): number => {
  const today = new Date();
  const target = new Date(targetDate);
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const getDaysBetween = (date1: Date, date2: Date): number => {
  const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / oneDay);
};

export const sortGoals = (goals: Goal[], sortBy: 'name' | 'progress' | 'date' | 'status'): Goal[] => {
  const sorted = [...goals];
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'progress':
      return sorted.sort((a, b) => {
        const progressA = calculateProgress(a.currentValue, a.targetValue);
        const progressB = calculateProgress(b.currentValue, b.targetValue);
        return progressB - progressA;
      });
    case 'date':
      return sorted.sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime());
    case 'status':
      return sorted.sort((a, b) => a.status.localeCompare(b.status));
    default:
      return sorted.sort((a, b) => a.order - b.order);
  }
};

export const filterGoals = (goals: Goal[], filter: GoalStatus | 'all'): Goal[] => {
  if (filter === 'all') return goals;
  return goals.filter(goal => goal.status === filter);
};
