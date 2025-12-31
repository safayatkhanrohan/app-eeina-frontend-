import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { TargetNutrition } from '@/pages/Goals/types/type';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface PiechartProps {
  dailyNutrition?: TargetNutrition;
}

const chartDataConfig: { key: keyof TargetNutrition; color: string; labelKey: string }[] = [
  { key: 'carbs', color: '#6BAA47', labelKey: 'carb_label' },
  { key: 'protein', color: '#609542', labelKey: 'protein_label' },
  { key: 'sugar', color: '#588C3A', labelKey: 'Sugars_label' },
  { key: 'fat', color: '#6AB240BA', labelKey: 'Fats_label' },
];

const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent }: any) => {
  const offset = 12; // increased offset slightly for visibility
  const radius = outerRadius + offset;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  if (percent === 0) return null;

  return (
    <g>
      <circle cx={x} cy={y} r={16} fill="white" strokeWidth={1} stroke="#EAEAEA" />
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

export default function DoughnutRecharts({ dailyNutrition }: PiechartProps) {
  const { t } = useLanguage();

  // Prepare data for Recharts
  // Ensure we have values. If undefined, default to 0.
  const chartData = chartDataConfig.map((item) => ({
    name: item.key,
    value: dailyNutrition ? dailyNutrition[item.key] || 0 : 0,
    color: item.color,
  }));

  // Check if we have any data to show
  const hasData = chartData.some((d) => d.value > 0);
  // Prevent all-zero chart which might look broken
  // If no data, maybe show a placeholder or just empty?
  // Recharts handles 0 values by not rendering segments.

  return (
    <div className="relative">
      <CardHeader className="!pb-0">
        <CardTitle className="font-semibold text-[20px]">{t.GoalsDashboard.DailyRecap}</CardTitle>
        <p className="font-normal text-[16px] text-[#999999]">{t.GoalsDashboard.DailyRecapdusc}</p>
      </CardHeader>

      <CardContent className="relative flex justify-start !p-0 items-center">
        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie
              data={hasData ? chartData : [{ name: 'Empty', value: 1, color: '#f3f4f6' }]}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              dataKey="value"
              paddingAngle={hasData ? 6 : 0}
              cornerRadius={10}
              label={hasData ? renderCustomLabel : false}
              labelLine={false}
              stroke="none"
            >
              {hasData ? (
                chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
              ) : (
                <Cell key="empty" fill="#f3f4f6" />
              )}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <ul className="w-full flex flex-col gap-2 list-none">
          {chartDataConfig.map((item) => (
            <li key={item.key} className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="flex justify-between w-full">
                <span className="text-base font-normal">
                  {/* @ts-ignore - t.goalSetup might strictly typed via another way but this is safe assumption given existing code */}
                  {t.goalSetup[item.labelKey]}
                </span>
                <span className="text-base font-medium">
                  {dailyNutrition ? Math.round(dailyNutrition[item.key]) : 0} g
                </span>
              </span>
            </li>
          ))}
        </ul>
      </CardFooter>
    </div>
  );
}
