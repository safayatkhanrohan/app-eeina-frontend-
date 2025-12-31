import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
const BarChartHeader = () => {
  const { t } = useLanguage();
  return (
    <CardHeader className="px-3 lg:px-6 flex flex-row justify-between">
      <div className="">
        <CardTitle className="text-base lg:text-[20px] font-semibold text-[#121212]">
          {t.GoalsDashboard.MyActivity}
        </CardTitle>
        <CardDescription className="text-[14px] font-normal text-[#999999]">
          {t.GoalsDashboard.ActivityDescription}
        </CardDescription>
      </div>
      <Select>
        <SelectTrigger
          iconColor="text-white"
          className="w-fit py-4 text-[14px] lg:text-[16px] font-medium lg:w-[136px] bg-[#6AB240] !text-white"
        >
          <SelectValue placeholder={t.GoalsDashboard.Weekly} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t.GoalsDashboard.Weekly}</SelectLabel>
            <SelectItem value="Weekly">{t.GoalsDashboard.Weekly}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </CardHeader>
  );
};

export default BarChartHeader;
