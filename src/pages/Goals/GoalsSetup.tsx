import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm, FormProvider, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { getGoalSchema } from './validation/GoalSetup.Validation';
import WelcomeScreen from './components/WelcomeScreen';
import GoalSelection from './components/GoalSelection';
import GoalDuration from './components/GoalDuration';
import BasicInformation from './components/BasicInformation';
import BMIResult from './components/BMIResult';
import TargetWeight from './components/TargetWeight';
import GoalCalculation from './components/GoalCalculation';
import DailyMealWithCalender from './components/DailyMealWithCalender';
import { GeneratedMealPlan, UserInfo } from './types/type';
import TargetNutrients from './components/TargetNutrients';

const GoalSetup = () => {
  const location = useLocation();
  const { goalType, isModification, goalId, currentWeight, height, age, gender, activityLevel } =
    location.state || {};
  const { t } = useLanguage();

  const goalSchema = useMemo(() => getGoalSchema(t), [t]);

  const methods = useForm<UserInfo>({
    resolver: zodResolver(goalSchema) as Resolver<UserInfo>,
    mode: 'onChange',
    defaultValues: {
      type: goalType || undefined,
      currentWeight: currentWeight || undefined,
      targetWeight: undefined,
      height: height || undefined,
      age: age || undefined,
      gender: gender || undefined,
      activityLevel: activityLevel || undefined,
      durationWeeks: undefined,
    },
  });

  const { watch } = methods;
  const userInfo = watch();

  const [step, setStep] = useState(1);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedMealPlan | {}>({});

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);
const skip = () => setStep((prev) => prev + 1);

  // Check if user needs target weight step (only for weight gain/loss goals)
  const needsTargetWeight = userInfo.type === 'Gain Weight' || userInfo.type === 'Lose Weight';

  console.log('goalType', goalType);
  console.log('isModification', isModification);

  // Build steps array dynamically based on user's goal
  const buildSteps = () => {
    const baseSteps = [];
    if (!isModification) baseSteps.push(<WelcomeScreen next={next} key="welcome" />);

    baseSteps.push(
      <BasicInformation next={next} back={back} skip={skip} key="basic-information" />,
      <BMIResult next={next} back={back} key="bmi-result" />,
    );

    if (!isModification)
      baseSteps.push(<GoalSelection next={next} back={back} key="goal-selection" />);

    // Add target weight step if user selected weight gain or weight loss
    if (needsTargetWeight) {
      baseSteps.push(<TargetWeight next={next} back={back} key="target-weight" />);
    }

    // Continue with duration and rest of the flow
    baseSteps.push(
      <GoalDuration
        next={next}
        back={back}
        skip={skip}
        key="duration"
        isModification={isModification}
        goalId={goalId}
      />,
      <GoalCalculation next={next} back={back} key="calculation" userInfo={userInfo} />,
      <TargetNutrients next={next} back={back} key="calorie-overview" userInfo={userInfo} />,
      // <PlanTemplates next={next} back={back} key="plan-templates" />,

      <DailyMealWithCalender
        next={next}
        back={back}
        key="daily-calendar"
        userInfo={userInfo}
        generatedMealPlans={generatedPlan}
        setGeneratedPlan={setGeneratedPlan}
      />,
    );

    return baseSteps;
  };

  const steps = buildSteps();

  return (
    <FormProvider {...methods}>
      <div className="max-w-6xl xl2:max-w-7xl mx-auto px-6 min-h-screen">{steps[step - 1]}</div>
    </FormProvider>
  );
};

export default GoalSetup;
