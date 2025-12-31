import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Info } from 'lucide-react';
import { Calories, Carbohydrates, Protein, Sugers, TotalFat } from '@/assets';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceDot,
} from 'recharts';
import constants from 'constants';

interface NutritionValue {
  amount: number;
  unit: string;
}

interface NutritionItem {
  label: string;
  value: NutritionValue;
}

interface NutritionSectionProps {
  nutritionData: NutritionItem[];
  unitMap: Record<string, string>;
  language: string;
  glycemicIndex: number | undefined | null;
  glycemicLoad: number | undefined | null;
  t: any;
  onViewAllNutrients: () => void;
}

/**
 * Get glycemic index level and styling
 */
const getGlycemicIndexLevel = (
  value: number,
  language: string,
): { level: string; color: string; bgColor: string; textColor: string } => {
  if (value <= 55) {
    return {
      level: language === 'ar' ? 'منخفض' : 'Low',
      color: '#22c55e',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    };
  } else if (value <= 69) {
    return {
      level: language === 'ar' ? 'متوسط' : 'Medium',
      color: '#eab308',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    };
  } else {
    return {
      level: language === 'ar' ? 'مرتفع' : 'High',
      color: '#ef4444',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    };
  }
};

/**
 * Get glycemic load level and styling
 */
const getGlycemicLoadLevel = (
  value: number,
  language: string,
): { level: string; color: string; bgColor: string; textColor: string } => {
  if (value <= 10) {
    return {
      level: language === 'ar' ? 'منخفض' : 'Low',
      color: '#22c55e',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    };
  } else if (value <= 19) {
    return {
      level: language === 'ar' ? 'متوسط' : 'Medium',
      color: '#eab308',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    };
  } else {
    return {
      level: language === 'ar' ? 'مرتفع' : 'High',
      color: '#ef4444',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    };
  }
};

export const NutritionSection: React.FC<NutritionSectionProps> = ({
  nutritionData,
  unitMap,
  language,
  glycemicIndex,
  glycemicLoad,
  t: _t,
  onViewAllNutrients,
}) => {
  // Show first 10 nutrients
  const displayData = nutritionData.slice(0, 5);
  const hasMoreNutrients = nutritionData.length > 10;

  const dialogContent =
    language === 'ar'
      ? {
        giDesc1: (
          <>
            يقيس مؤشر السكر (<strong>GI</strong>) كيفية تأثير الكربوهيدرات على مستويات الجلوكوز في
            الدم، مما يساعدك على اختيار الأطعمة لصحة جيدة. تحتاج إلى الكربوهيدرات لأنها تتحلل إلى
            جلوكوز وتوفر الوقود لمعظم الأعضاء، ودماغنا، وعضلاتنا أثناء التمرين.
          </>
        ),
        giDesc2: (
          <>
            تتسبب الكربوهيدرات ذات مؤشر السكر المرتفع (<strong>High GI</strong>) في ارتفاع وانخفاض
            مستويات الجلوكوز في الدم بسرعة.
          </>
        ),
        giDesc3: (
          <>
            يتم هضم الكربوهيدرات ذات مؤشر السكر المنخفض (<strong>Low GI</strong>) وإطلاقها ببطء
            للحصول على طاقة مستدامة.
          </>
        ),
        glTitle: 'الحمل السكري (GL)',
        glDesc: (
          <>
            يجمع الحمل السكري بين كمية ونوعية (<strong>GI</strong>) الكربوهيدرات مما يوفر طريقة
            لمقارنة قيم الجلوكوز في الدم لأنواع وكميات مختلفة من الأطعمة. يعتمد ارتفاع مستوى
            الجلوكوز في الدم ومدة بقائه مرتفعًا على الحمل السكري. هناك ثلاثة تصنيفات للحمل السكري:{' '}
            <ul>
              <li> <strong>منخفض</strong> 10 أو أقل</li>
              <li> <strong>متوسط</strong> 11 - 19</li>
              <li> <strong>مرتفع</strong> 20 أو أكثر</li>
            </ul>

          </>
        ),
        chartX: 'الوقت / ساعات',
        chartY: 'مستويات الجلوكوز في الدم',
        highGI: 'مؤشر سكر مرتفع',
        lowGI: 'مؤشر سكر منخفض',
      }
      : {
        giDesc1: (
          <>
            The Glycemic Index (<strong>GI</strong>) measures how carbohydrates affect your blood
            glucose levels, helping you choose foods for good health. You need carbs as they break
            down into glucose and provide fuel for most organs, our brain, and muscles during
            exercise.
          </>
        ),
        giDesc2: (
          <>
            High <strong>GI</strong> carbs cause blood glucose levels to spike and crash.
          </>
        ),
        giDesc3: (
          <>
            Low <strong>GI</strong> carbs are digested and released slowly for sustained energy.
          </>
        ),
        glTitle: 'Glycemic Load (GL)',
        glDesc: (
          <>
            Glycemic Load combines the quantity and quality (<strong>GI</strong>) of carbohydrates
            providing a way to compare blood glucose values of different types and amounts of
            foods. How high your blood glucose rises and how long it stays high depends on GL.
            There are three classifications for GL:
            <ul>
              <li><strong>Low</strong> (10 or less),{' '}</li>
              <li><strong>Moderate</strong> (11 – 19),</li>
              <li><strong>High</strong> (20 or more).</li>
            </ul>

          </>
        ),
        chartX: 'Time / Hours',
        chartY: 'Blood Glucose Levels',
        highGI: 'High GI',
        lowGI: 'Low GI',
      };

  /**
   * Get the appropriate icon and color for a nutrition label
   */
  const nutritionIconMap = [
    {
      keys: ['calor', 'السعرات الحرارية'],
      icon: <Calories />,
    },
    {
      keys: ['protein', 'البروتين'],
      icon: <Protein />,
    },
    {
      keys: ['carb', 'الكربوهيدرات'],
      icon: <Carbohydrates />,
    },
    {
      keys: ['fat', 'الدهون'],
      icon: <TotalFat />,
    },
    {
      keys: ['sugar', 'السكر'],
      icon: <Sugers />,
    },
  ];

  const getNutritionIcon = (label: string, index: number) => {
    const lower = label.toLowerCase();

    if (index === 0) return { icon: <Calories /> };

    for (const entry of nutritionIconMap) {
      if (entry.keys.some(k => lower.includes(k))) {
        return { icon: entry.icon };
      }
    }

    return { icon: <Sparkles className="w-4 h-4" /> };
  };


  const chartdata = [
    { t: 0, high: 20, low: 10 },
    { t: 0.5, high: 35, low: 15 },
    { t: 1, high: 40, low: 20 },
    { t: 1.5, high: 30, low: 18 },
    { t: 2, high: 45, low: 25 },
    { t: 2.5, high: 35, low: 20 },
    { t: 3, high: 50, low: 30 },
    { t: 3.5, high: 40, low: 25 },
    { t: 4, high: 60, low: 35 },
    { t: 4.5, high: 50, low: 30 },
    { t: 5, high: 70, low: 45 },
    { t: 5.5, high: 55, low: 35 },
    { t: 6, high: 80, low: 55 },
    { t: 6.5, high: 60, low: 40 },
    { t: 7, high: 90, low: 65 },
    { t: 7.5, high: 70, low: 50 },
    { t: 8, high: 100, low: 70 },
  ];
  return (
    <Card className="shadow-none rounded-[16px] bg-white border-[#0000000D] border overflow-hidden mt-5 md:!mt-[-70px] xl:!mt-[-20px]">
      <CardContent className="px-3">
        {/* Enhanced Header with gradient background */}
        <div className="pt-3 lg:pt-10">
          <div className="pb-2 w-full">
            <div className="flex items-center justify-between pb-4 border-b border-[#E1E1E2]">
              <h3 className="font-semibold text-base text-gray-900">
                {language == 'ar' ? 'درجة التوازن الغذائي' : 'Nutrition balance score'}
              </h3>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Info className="w-4 h-4" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-[#6AB240] font-semibold text-[20px] xl-text-[48px]">
                      {language === 'ar' ? 'عن مؤشر السكر' : 'About Glycemic Index'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-sm font-semibold ">
                    <p>{dialogContent.giDesc1}</p>
                    <p>{dialogContent.giDesc2}</p>
                    <p>{dialogContent.giDesc3}</p>

                    {/* Chart Recharts */}
                    <div className="h-[250px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={chartdata}
                          margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            horizontal={true}
                            stroke="#D1D5DB"
                            opacity={0.6}
                          />
                          <defs>
                            <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#DC4444" stopOpacity={0} />
                              <stop offset="95%" stopColor="#DC4444" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#C2E66E" stopOpacity={0} />
                              <stop offset="95%" stopColor="#C2E66E" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="time"
                            tick={false}
                            axisLine={{ stroke: '#E5E7EB' }}
                            label={{
                              value: dialogContent.chartX,
                              position: 'insideBottom',
                              offset: -10,
                              fill: '#6B7280',
                              fontSize: 12,
                            }}
                          />
                          <YAxis
                            tick={{ fill: '#9CA3AF', fontSize: 10 }}
                            axisLine={{ stroke: '#E5E7EB' }}
                            label={{
                              value: dialogContent.chartY,
                              angle: -90,
                              position: 'insideLeft',
                              offset: 10,
                              fill: '#DC4444',
                              fontSize: 12,
                              fontWeight: 400,
                              style: { textAnchor: 'middle' },
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="high"
                            stroke="#DC4444"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorHigh)"
                          />
                          <Area
                            type="monotone"
                            dataKey="low"
                            stroke="#C2E66E"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorLow)"
                          />
                          {/* Custom Labels */}

                          <ReferenceDot
                            x={chartdata[chartdata.length - 1].t}
                            y={chartdata[chartdata.length - 9].high}
                            r={0}
                            label={{
                              value: `${dialogContent.highGI}`,
                              position: 'top',
                              fill: '#DC4444',
                              fontWeight: 'bold',
                            }}
                          />
                          <ReferenceDot
                            x={chartdata[10].t}
                            y={chartdata[4].low}
                            r={0}
                            label={{
                              value: `${dialogContent.lowGI}`,
                              position: 'top',
                              fill: '#C2E66E',
                              fontWeight: 'bold',
                            }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#6AB240]  mb-2">
                        {dialogContent.glTitle}
                      </h4>
                      <p className="font-semibold leading-8">{dialogContent.glDesc}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Glycemic Index & Glycemic Load Section - Samsung Food Style */}
        {(glycemicIndex !== null && glycemicIndex !== undefined) ||
          (glycemicLoad !== null && glycemicLoad !== undefined) ? (
          <div className="mb-4 mt-2">
            <div className="grid grid-cols-2 gap-3">
              {/* Glycemic Index Card */}
              {glycemicIndex !== null && glycemicIndex !== undefined && (
                <div
                  className={`${getGlycemicIndexLevel(glycemicIndex, language).bgColor} rounded-xl p-4 transition-all hover:shadow-md`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-1.5 mb-2">
                      <svg
                        className={`w-4 h-4 ${getGlycemicIndexLevel(glycemicIndex, language).textColor}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                      <span className="text-xs font-medium text-gray-600">
                        {language === 'ar' ? 'مؤشر السكر' : 'Glycemic Index'}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-2xl font-bold ${getGlycemicIndexLevel(glycemicIndex, language).textColor}`}
                      >
                        {Math.round(glycemicIndex)}
                      </span>
                    </div>
                    <span
                      className={`mt-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${getGlycemicIndexLevel(glycemicIndex, language).textColor}`}
                      style={{
                        backgroundColor: `${getGlycemicIndexLevel(glycemicIndex, language).color}20`,
                      }}
                    >
                      {getGlycemicIndexLevel(glycemicIndex, language).level}
                    </span>
                  </div>
                </div>
              )}

              {/* Glycemic Load Card */}
              {glycemicLoad !== null && glycemicLoad !== undefined && (
                <div
                  className={`${getGlycemicLoadLevel(glycemicLoad, language).bgColor} rounded-xl p-4 transition-all hover:shadow-md`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-1.5 mb-2">
                      <svg
                        className={`w-4 h-4 ${getGlycemicLoadLevel(glycemicLoad, language).textColor}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </svg>
                      <span className="text-xs font-medium text-gray-600">
                        {language === 'ar' ? 'الحمل السكري' : 'Glycemic Load'}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-2xl font-bold ${getGlycemicLoadLevel(glycemicLoad, language).textColor}`}
                      >
                        {typeof glycemicLoad === 'number' ? glycemicLoad.toFixed(1) : glycemicLoad}
                      </span>
                    </div>
                    <span
                      className={`mt-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${getGlycemicLoadLevel(glycemicLoad, language).textColor}`}
                      style={{
                        backgroundColor: `${getGlycemicLoadLevel(glycemicLoad, language).color}20`,
                      }}
                    >
                      {getGlycemicLoadLevel(glycemicLoad, language).level}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Info text */}
            <p className="text-[10px] text-gray-500 mt-2 text-center">
              {language === 'ar'
                ? 'مؤشر السكر والحمل السكري يقيسان تأثير الطعام على مستوى السكر في الدم'
                : 'GI & GL measure how food affects blood sugar levels'}
            </p>
          </div>
        ) : null}

        <div className="">
          {/* All Nutrients - Enhanced with icons and gradients */}
          <span className="pt-2 pb-2 block w-full text-start text-[#000] font-bold text-[15px]">
            {language == 'ar' ? 'لكل حصة' : 'Per Serving'}
          </span>

          {displayData.map((item, index) => {
            const { icon } = getNutritionIcon(item.label, index);

            return (
              <div
                key={index}
                className={` flex items-center justify-between p-3 ${index === 0 ? 'pt-0' : ''} border-b border-b-[#E1E1E2]`}
              >
                <div className="flex items-center gap-2 sm:gap-3 flex-1">
                  <div>{icon}</div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm sm:text-lg font-bold text-gray-900">
                        {item.value.amount}
                      </span>
                      <span className="text-xs font-medium text-gray-500">
                        {unitMap[item.value.unit] || item.value.unit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Enhanced View All Nutrients Button with gradient */}
          {hasMoreNutrients && (
            <div className="">
              <button
                className="text-[16px] w-full relative overflow-hidden  font-semibold pt-4"
                onClick={onViewAllNutrients}
              >
                <span className="flex items-center justify-center gap-2">
                  {language === 'ar' ? 'عرض جميع العناصر الغذائية' : 'View all nutrients'}
                </span>
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
