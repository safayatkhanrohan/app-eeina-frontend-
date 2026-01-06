import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { Link } from 'react-router-dom'

const NoGoalsMessage = () => {
    const {language} = useLanguage()
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <h2 className="text-lg font-bold text-gray-900">
        {language === 'ar' 
          ? 'لم تُنشئ أي هدف بعد' 
          : "You haven't created any goals yet"}
      </h2>
      <p className="text-sm text-gray-500">
        {language === 'ar' 
          ? 'ابدأ الآن بوضع أهدافك لتتبع تقدمك' 
          : "Start setting goals to track your progress"}
      </p>
      <Link to="/goals-setup">
        <Button className="bg-[#6AB240] hover:bg-[#5da035] text-white rounded-xl px-6 py-2">
          {language === 'ar' ? 'إنشاء هدف' : 'Create Goal'}
        </Button>
      </Link>
    </div>
  )
}

export default NoGoalsMessage
