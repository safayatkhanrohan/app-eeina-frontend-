import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Bookappointments = () => {
    const {t} = useLanguage()
  return (
    <div className="flex flex-col  gap-3">
      <h3 className="text-[#6AB240] text-base mdtext-[24px] font-bold">
        {t.nutritionist.Bookappointments}
      </h3>
      <Card className="flex flex-col gap-4  p-4 md:p-6 shadow-none border border-[#E1E1E1] rounded-[20px]">
        <div className="flex items-start gap-3">
          <h3 className="text-[14px] lg:text-base xl2:text-[20px] font-semibold ">
            {t.nutritionist.Consultationtype}
            <span className="text-[14px] lg:text-base xl2:text-[20px] font-medium">
              (Nutrition, Food Science,)
            </span>
          </h3>
        </div>
        <div className="flex items-start gap-3">
          <h3 className="text-[14px] lg:text-base xl2:text-[20px] font-semibold ">
            {t.nutritionist.Sessionduration}

            <span className="text-[14px] lg:text-base xl2:text-[20px] font-medium">
              (Nutrition, Food Science,)
            </span>
          </h3>
        </div>
        <div className="flex items-start gap-3">
          <h3 className="text-[14px] lg:text-base xl2:text-[20px] font-semibold ">
            {t.nutritionist.Numberofsessionsweek}

            <span className="text-[14px] lg:text-base xl2:text-[20px] font-medium">
              (Nutrition, Food Science,)
            </span>
          </h3>
        </div>
        <div className="flex items-start gap-3">
          <h3 className="text-[14px] lg:text-base xl2:text-[20px] font-semibold ">
            {t.nutritionist.Workinghours}

            <span className="text-[14px] lg:text-base xl2:text-[20px] font-medium">
              (Nutrition, Food Science,)
            </span>
          </h3>
        </div>
      </Card>
    </div>
  );
};

export default Bookappointments;
