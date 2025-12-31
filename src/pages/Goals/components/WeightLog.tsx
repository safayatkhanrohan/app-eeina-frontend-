import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/formatDate';
import { cn } from '@/lib/utils';
import { useUpdateWeightProgressMutation } from '@/redux/Features/Goals/GoalsApi';
import { Plus, TrendingDown, TrendingUp } from 'lucide-react';
import React, { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

interface WeightLogProps {
  className?: string;
  logs: { date: Date | string; weight: number }[];
  height: number; // in cm
  startWeight: number;
  goalId?: string;
}

const WeightLog = ({ className, logs, height, startWeight, goalId }: WeightLogProps) => {
  const [open, setOpen] = React.useState(false);
  const [weight, setWeight] = React.useState<string>('');
  const [updateWeightProgress] = useUpdateWeightProgressMutation();

  const handleAddLog = () => {
    const weightVal = parseFloat(weight);
    if (!weightVal || weightVal <= 0) return;

    updateWeightProgress({ goalId: goalId || '1', weight: weightVal });
    setOpen(false);
    setWeight('');
  };

  const processedLogs = useMemo(() => {
    if (!logs || logs.length === 0) return [];
    // Sort by date ascending for chart
    const sorted = [...logs].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    return sorted;
  }, [logs]);

  // Statistics
  const currentWeight =
    processedLogs.length > 0 ? processedLogs[processedLogs.length - 1].weight : 0;
  const totalChange = currentWeight - startWeight;
  const isWeightLoss = totalChange <= 0;

  // Recent logs (descending)
  const recentLogs = useMemo(() => {
    return [...processedLogs].reverse();
  }, [processedLogs]);

  // Calculate BMI and Get Status
  const getBMIInfo = (weight: number) => {
    if (!height) return { bmi: '-', status: '-', color: 'text-gray-400', bg: 'bg-gray-50' };
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);
    const bmiVal = bmi.toFixed(1);

    let status = 'Normal';
    let color = 'text-green-500';
    let bg = 'bg-green-50';

    if (bmi < 18.5) {
      status = 'Underweight';
      color = 'text-blue-500';
      bg = 'bg-blue-50';
    } else if (bmi >= 25 && bmi < 30) {
      status = 'Overweight';
      color = 'text-orange-500';
      bg = 'bg-orange-50';
    } else if (bmi >= 30) {
      status = 'Obese';
      color = 'text-red-500';
      bg = 'bg-red-50';
    }

    return { bmi: bmiVal, status, color, bg };
  };

  const chartData = processedLogs.map((log) => ({
    date: formatDate(log.date, { short: true }),
    weight: log.weight,
  }));

  return (
    <div
      className={cn('flex-1 p-5  flex flex-col gap-6 bg-white rounded-3xl shadow-sm', className)}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-[22px] font-bold text-[#1E1E1E]">Weight Journey</h2>
          <p className="text-[#878787] text-sm">Track your timeline</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#101828] text-white hover:bg-black rounded-xl px-4 py-2 flex items-center gap-2">
              <Plus size={18} />
              Log Weight
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Weight Log</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                type="number"
                placeholder="Enter weight in kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddLog} className="bg-[#6AB240] hover:bg-[#5da035]">
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#F8F9FB] rounded-2xl p-4 flex flex-col justify-center items-start">
          <span className="text-[#98A2B3] text-xs font-bold uppercase mb-1">Starting</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#101828]">{startWeight}</span>
            <span className="text-[#98A2B3] text-sm font-medium">kg</span>
          </div>
          <span className="text-[#98A2B3] text-xs mt-1">
            {processedLogs.length > 0 ? formatDate(processedLogs[0].date, { short: true }) : '-'}
          </span>
        </div>

        <div className="bg-[#F8F9FB] rounded-2xl p-4 flex flex-col justify-center items-start relative overflow-hidden">
          <div className="absolute right-0 top-0 p-2 opacity-10">
            {isWeightLoss ? <TrendingDown size={40} /> : <TrendingUp size={40} />}
          </div>
          <span className="text-[#98A2B3] text-xs font-bold uppercase mb-1">Total Change</span>
          <div className="flex items-baseline gap-1">
            <span
              className={cn(
                'text-2xl font-bold',
                isWeightLoss ? 'text-[#039855]' : 'text-[#D92D20]',
              )}
            >
              {totalChange > 0 ? '+' : ''}
              {totalChange.toFixed(1)}
            </span>
            <span className="text-[#98A2B3] text-sm font-medium">kg</span>
          </div>
          <span className="text-[#98A2B3] text-xs mt-1">Since start</span>
        </div>

        <div className="bg-[#F8F9FB] rounded-2xl p-4 flex flex-col justify-center items-start">
          <span className="text-[#039855] text-xs font-bold uppercase mb-1">Current</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#101828]">{currentWeight}</span>
            <span className="text-[#98A2B3] text-sm font-medium">kg</span>
          </div>
          <span className="text-[#98A2B3] text-xs mt-1">Latest Log</span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[200px] mt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[#98A2B3] text-xs font-bold uppercase">Progress Chart</span>
          <span className="px-3 py-1 bg-[#F2F4F7] rounded-full text-xs text-[#667085] font-medium">
            Swipe for history
          </span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E90FA" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2E90FA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAECF0" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#98A2B3', fontSize: 12 }}
              dy={10}
            />
            {/* Do not show Y Axis to keep it clean like the image? Or maybe just minimal */}
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="#00A2C0"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorWeight)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Logs List */}
      <div className="mt-4">
        <h3 className="text-[#98A2B3] text-xs font-bold uppercase mb-4">Recent Logs Series</h3>
        <div className="flex flex-col gap-3">
          {recentLogs.slice(0, 5).map((log, index) => {
            const prevLog = recentLogs[index + 1];
            const change = prevLog ? log.weight - prevLog.weight : 0;
            const { bmi, status, color, bg } = getBMIInfo(log.weight);
            const dateObj = new Date(log.date);

            return (
              <div
                key={index}
                className="flex justify-between items-center p-4 border border-[#EAECF0] rounded-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#F9FAFB] rounded-lg p-2 text-center min-w-[50px]">
                    <span className="block text-[10px] text-[#98A2B3] font-bold uppercase">
                      {dateObj.toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="block text-lg font-bold text-[#101828]">
                      {dateObj.getDate()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-[#1E1E1E]">{log.weight} kg</span>
                      {index !== recentLogs.length - 1 && (
                        <span
                          className={cn(
                            'text-xs font-medium',
                            change <= 0 ? 'text-[#039855]' : 'text-[#D92D20]',
                          )}
                        >
                          {change > 0 ? '+' : ''}
                          {change.toFixed(1)}
                        </span>
                      )}
                      {index !== recentLogs.length - 1 &&
                        (change <= 0 ? (
                          <TrendingDown size={14} className="text-[#039855]" />
                        ) : (
                          <TrendingUp size={14} className="text-[#D92D20]" />
                        ))}
                    </div>
                  </div>
                </div>

                {/* BMI Badge */}
                <div className={cn('px-4 py-2 rounded-xl flex flex-col items-end', bg)}>
                  <span className={cn('text-xs font-bold', color)}>BMI {bmi}</span>
                  <span className={cn('text-[10px] font-bold uppercase opacity-80', color)}>
                    {status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeightLog;
