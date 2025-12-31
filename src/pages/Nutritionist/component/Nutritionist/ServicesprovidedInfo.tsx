import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesprovidedInfo = () => {
  const { t } = useLanguage();
  return (
    <div className="order-1 lg:order-2 flex flex-col col-span-12 lg:col-span-9 gap-3 h-full">
      <div className="flex flex-col  gap-3">
        <h3 className="text-[#6AB240] text-base md:text-[24px] font-bold">
          {t.nutritionist.Academicqualifications}
        </h3>
        <Card className="flex flex-col gap-4 p-4 md:p-6 shadow-none border border-[#E1E1E1] rounded-[20px]">
          <div className="flex items-start gap-3">
            <h3 className="text-[14px] lg:text-base xl2:text-[20px] font-semibold ">
              {t.nutritionist.Universitydegree}
            
           <span className="text-[14px] lg:text-base xl2:text-[20px] font-medium">(Nutrition, Food Science,)</span></h3>
          </div>
          <div className="flex items-start gap-3">
            <h3 className="text-[14px] lg:text-base xl2:text-[20px] font-semibold ">
              {t.nutritionist.UniversityGrantingInstitution}
          
            <span className="text-[14px] lg:text-base xl2:text-[20px] font-medium">(Nutrition, Food Science,)</span>  </h3>
          </div>
          <div className="flex items-start gap-3">
            <h3 className="text-[14px] lg:text-base xl2:text-[20px] font-semibold ">
              {t.nutritionist.Yearofgraduation}
          
            <span className="text-[14px] lg:text-base xl2:text-[20px] font-medium">(Nutrition, Food Science,)</span></h3>
          </div>
          <div className="flex items-start gap-3">
            <h3 className="text-[14px] lg:text-base xl2:text-[20px] font-semibold ">
              {t.nutritionist.Additionalcertifications}
          
            <span className="text-[14px] lg:text-base xl2:text-[20px] font-medium">(Nutrition, Food Science,)</span></h3>
          </div>
        </Card>
      </div>
      <div className="flex flex-col  gap-3">
        <h3 className="text-[#6AB240] text-base mdtext-[24px] font-bold">
          {t.nutritionist.LicensesAccreditations}
        </h3>
        <Card className="flex flex-col gap-4  p-4 md:p-6 shadow-none border border-[#E1E1E1] rounded-[20px]">
          <div className="flex items-start gap-3">
            <h3 className="text-[14px] lg:text-base xl2:text-[20px] font-semibold ">
              {t.nutritionist.ProfessionalLicenseNumber}   
              <span className="text-[14px] lg:text-base xl2:text-[20px] font-medium">(Nutrition, Food Science,)</span>
               </h3>
          
          </div>
          <div className="flex items-start gap-3">
            <h3 className="text-[14px] lg:text-base xl2:text-[20px] font-semibold ">
              {t.nutritionist.Donor}
          
            <span className="text-[14px] lg:text-base xl2:text-[20px] font-medium">(Nutrition, Food Science,)</span></h3>
          </div>
          <div className="flex items-start gap-3">
            <h3 className="text-[14px] lg:text-base xl2:text-[20px] font-semibold ">
              {t.nutritionist.Licensing}
           
            <span className="text-[14px] lg:text-base xl2:text-[20px] font-medium">(Nutrition, Food Science,)</span></h3>
          </div>
          <div className="flex items-start gap-3">
            <h3 className="text-[14px] lg:text-base xl2:text-[20px] font-semibold ">
              {t.nutritionist.Expirydate}
            
            <span className="text-[14px] lg:text-base xl2:text-[20px] font-medium">(Nutrition, Food Science,)</span></h3>
          </div>
          <div className="flex items-start gap-3">
            <h3 className="text-[14px] lg:text-base xl2:text-[20px] font-semibold ">
              {t.nutritionist.Documentedproof}
           
            <span className="text-[14px] lg:text-base xl2:text-[20px] font-medium">(Nutrition, Food Science,)</span></h3>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ServicesprovidedInfo;
