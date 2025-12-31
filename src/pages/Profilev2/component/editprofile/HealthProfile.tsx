import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import HealthProfileModal from './HealthProfileModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { Controller, useFormContext } from 'react-hook-form';
import { EditProfileType } from '@/schemas/auth/User.Validation';
import { healthProfileSectionRenderers } from './healthProfileSections';
import { Button } from '@/components/ui/button';
type SectionKey =
  | 'basic'
  | 'body'
  | 'diet'
  | 'cooking'
  | 'health'
  | 'lab'
  | 'liver'
  | 'kidney'
  | 'vitamins'
  | 'thyroid';

const HealthProfile = () => {
  const [activeKey, setActiveKey] = useState<SectionKey | null>(null);
  const { t, language } = useLanguage();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EditProfileType>();
const sections: { key: SectionKey; title: string }[] = [
  { key: 'basic', title: t.goals.basic_information },
  { key: 'body', title: t.goals.body_composition },
  { key: 'diet', title: t.goals.dietary_preferences },
  { key: 'cooking', title: t.goals.cooking_context },
  { key: 'health', title: t.goals.health_conditions},
  { key: 'lab', title: t.goals.lab_metrics_cholesterol },
  { key: 'liver', title: t.goals.liver_function },
  { key: 'kidney', title: t.goals.kidney_function},
  { key: 'vitamins', title: t.goals.vitamins_minerals },
  { key: 'thyroid', title: t.goals.thyroid_function },
];
  return (
    <>
      <Card className="mt-2 lg:h-[574px]">
        <CardContent className="px-4 py-6 lg:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {sections.map((section) => (
            <div
              onClick={() => setActiveKey(section.key)}
              key={section.key}
              className={`
               ${activeKey === section.key ? 'bg-[#87B740]' : 'bg-transparent'}
                border border-[#DCDBDD] rounded-[12px] px-5 py-3 flex justify-between items-center cursor-pointer`}
                  >
              <p
                className={`text-base font-normal ${activeKey === section.key ? 'text-white' : 'text-[#22212C]'}`}
              >
                {section.title}
              </p>
              <ChevronDown
                className={` ${activeKey === section.key ? 'text-white' : 'text-[#22212C]'}`}
              />
            </div>
          ))}
            <Button
            type="submit"
            form="edit-profile-form"
            className="flex lg:hidden bg-primaryColor hover:bg-[#1c9a40] text-white px-4 sm:px-8 rounded-[12px] py-3 h-12 w-full sm:w-auto"
          >
            {language === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
          </Button>
        </CardContent>

      </Card>
      <HealthProfileModal
        open={!!activeKey}
        onOpenChange={() => setActiveKey(null)}
        title={sections.find((s) => s.key === activeKey)?.title || ''}
      >
        {activeKey &&
          healthProfileSectionRenderers[activeKey]({
            register,
            control,
            errors,
            t,
            language,
          })}
      </HealthProfileModal>
    </>
  );
};

export default HealthProfile;
