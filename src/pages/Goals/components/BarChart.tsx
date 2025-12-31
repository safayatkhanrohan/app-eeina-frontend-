import { CardContent } from '@/components/ui/card';
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, LabelList, ResponsiveContainer } from 'recharts';

const chartData = [
  { day: 'Mon', value: 186 },
  { day: 'Tue', value: 305 },
  { day: 'Wed', value: 237 },
  { day: 'Thu', value: 73 },
  { day: 'Fri', value: 209 },
  { day: 'Sat', value: 214 },
  { day: 'Sun', value: 150 },
];

const total = chartData.reduce((acc, cur) => acc + cur.value, 0);

const chartConfig = {
  desktop: {
    label: 'Desktop',
  },
} satisfies ChartConfig;

export function ChartBar() {
  return (
    <>
      <CardContent className="!px-0 lg:px-6 pb-2 lg:pb-6 z-11 flex-1 h-full">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="value"
                radius={8}
                fill="#6AB240"
                shape={(props: any) => {
                  const { index, x, y, width, height } = props;
                  return (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill="#6AB240"
                      opacity={index === 4 ? 1 : 0.3}
                      rx={8}
                    />
                  );
                }}
              >
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={(value: number) => `${Math.round((value / total) * 100)}%`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </>
  );
}
