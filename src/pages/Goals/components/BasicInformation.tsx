import { Button } from '@/components/ui/button';
import { GoalSetupProps, UserInfo } from '../types/type';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFormContext } from 'react-hook-form';

interface BasicInformationProps extends GoalSetupProps {}

const BasicInformation = ({ next, skip }: BasicInformationProps) => {
  const { t } = useLanguage();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useFormContext<UserInfo>();

  const userInfo = watch();
  console.log('USER INFO', userInfo);

  const handleNext = async () => {
    const isValidStep = await trigger([
      'currentWeight',
      'height',
      'age',
      'gender',
      'activityLevel',
    ]);
    if (isValidStep) {
      next();
    }
  };

  const options: { label: string; value: UserInfo['activityLevel'] }[] = [
    { label: t.goalSetup.activity_little, value: 'sedentary' },
    { label: t.goalSetup.activity_middle, value: 'lightly_active' },
    { label: t.goalSetup.activity_active, value: 'moderately_active' },
    { label: t.goalSetup.activity_very_active, value: 'very_active' },
    { label: t.goalSetup.activity_extra_active, value: 'super_active' },
  ];
  return (
    <div className="flex justify-between items-stretch gap-5 md:gap-7 xl2:gap-16 py-16 md:h-[928px]">
      <div className=" items-center rounded-[32px] md:flex-1 flex flex-col h-full bg-[#FBFCFC] md:shadow justify-around px-0 md:px-5 xl2:px-10">
        <div className="flex flex-col gap-8">
          <h2 className="text-center md:text-start font-semibold text-[24px] xl:text-[36px]">
            {t.goalSetup.info_main_title}
            <span className="text-primaryColor"> {t.goalSetup.info_main_highlight}</span>
          </h2>
          <div className="flex flex-col gap-5">
            <div className="relative w-full ">
              <input
                {...register('currentWeight', { valueAsNumber: true })}
                type="number"
                id="floating_outlined"
                placeholder=" "
                className="block h-12 w-full px-3 pb-2.5 pt-4 text-base text-gray-800 bg-white rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-[#DCDBDD] focus:border-[#DCDBDD] peer"
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-[14px] md:text-[16px] text-[#84818A] duration-300 transform -translate-y-1/2 top-1/2 z-10 origin-[0] bg-white px-2 peer-focus:top-2 peer-focus:scale-75 
                peer-focus:-translate-y-4 peer-focus:text-[#84818A] 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                 peer-valid:top-2 peer-valid:scale-75 peer-valid:-translate-y-4
                start-3"
              >
                {t.goalSetup.input_weight}
              </label>
              {errors.currentWeight && (
                <p className="text-red-500 text-sm mt-1">{errors.currentWeight.message}</p>
              )}
            </div>
            <div className="relative w-full ">
              <input
                type="number"
                {...register('height', { valueAsNumber: true })}
                id="floating_outlined_height"
                placeholder=" "
                className="block h-12 w-full px-3 pb-2.5 pt-4 text-base text-gray-800 bg-white rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-[#DCDBDD] focus:border-[#DCDBDD] peer"
              />
              <label
                htmlFor="floating_outlined_height"
                className="absolute text-[14px] md:text-[16px] text-[#84818A] duration-300 transform
                 -translate-y-1/2 top-1/2 z-10 origin-[0] bg-white px-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4
                  peer-focus:text-[#84818A] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                   peer-valid:top-2 peer-valid:scale-75 peer-valid:-translate-y-4
                   peer-placeholder-shown:top-1/2 start-3"
              >
                {t.goalSetup.input_height}
              </label>
              {errors.height && (
                <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>
              )}
            </div>
            <div className="relative w-full ">
              <input
                type="number"
                {...register('age', { valueAsNumber: true })}
                id="floating_outlined"
                placeholder=" "
                className="block h-12 w-full px-3 pb-2.5 pt-4 text-base text-gray-800 bg-white rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-[#DCDBDD] focus:border-[#DCDBDD] peer"
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-[14px] md:text-[16px] text-[#84818A] duration-300 transform -translate-y-1/2
                 top-1/2 z-10 origin-[0] bg-white px-2 peer-focus:top-2 peer-focus:scale-75 
                 peer-focus:-translate-y-4 peer-focus:text-[#84818A] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                 peer-placeholder-shown:top-1/2  peer-valid:top-2 peer-valid:scale-75 peer-valid:-translate-y-4 start-3"
              >
                {t.goalSetup.input_age}
              </label>
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-[#84818A] font-semibold text-[16px]">{t.goals.gender}</h3>
              <div className="flex gap-3">
                <Button
                  onClick={() => setValue('gender', 'male', { shouldValidate: true })}
                  className={`py-5 flex-1 text-[14px] md:text-[16px] font-normal rounded-[12px]
                    ${userInfo.gender === 'male' ? 'bg-[#6AB240] text-white' : 'bg-white text-[#84818A] border border-[#DCDBDD]'}
                    hover:bg-[#6AB240] hover:text-white
                  `}
                >
                  {t.goals.male}
                </Button>
                <Button
                  onClick={() => setValue('gender', 'female', { shouldValidate: true })}
                  className={`py-5 flex-1 text-[14px] md:text-[16px] font-normal rounded-[12px]
                    ${userInfo.gender === 'female' ? 'bg-[#6AB240] text-white' : 'bg-white text-[#84818A] border border-[#DCDBDD]'}
                    hover:bg-[#6AB240] hover:text-white
                  `}
                >
                  {t.goals.female}
                </Button>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-[#84818A] font-semibold text-[16px]">Activity level</h3>
              <div className="flex gap-3 justify-start flex-wrap lg:flex-nowrap">
                {options.map((option) => {
                  const isSelected = userInfo.activityLevel === option.value;

                  return (
                    <Button
                      key={option.value}
                      onClick={() =>
                        setValue('activityLevel', option.value, { shouldValidate: true })
                      }
                      className={`py-5 mx-auto flex-1 text-[14px] md:text-[16px] font-normal rounded-[12px]
                      ${isSelected ? 'bg-[#6AB240] text-white' : 'bg-white text-[#84818A] border border-[#DCDBDD]'}
                      hover:bg-[#6AB240] hover:text-white
                    `}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
              {errors.activityLevel && (
                <p className="text-red-500 text-sm mt-1">{errors.activityLevel.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 w-full lg:w-[90%] mt-9">
          <Button
            onClick={handleNext}
            className={`mt-10 md:mt-0 py-[1.4rem]  w-full mx-auto font-medium text-[16px] md:text-[20px] rounded-xl
          bg-[#6AB240] text-white hover:bg-primaryColor
        `}
          >
            {t.goalSetup.next_btn}
          </Button>
            <Button
              variant={'outline'}
              onClick={skip}
                type="button"
              className="py-[1.4rem] w-full mx-auto !text-[#6AB240] text-16 md:text-[20px] font-medium"
            >
              {t.goalSetup.skip}
            </Button>
    
        </div>
      </div>
      <div className="flex-1 h-full  hidden md:flex">
        <img
          src="/goalinfo.svg"
          alt="goalinfo"
          className="rounded-[32px] h-full w-full object-cover "
        />
      </div>
    </div>
  );
};

export default BasicInformation;
