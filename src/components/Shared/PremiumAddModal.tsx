import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedPath } from '@/lib/getLocalizedPath';

interface PremiumAddModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PremiumAddModal = ({ open, onOpenChange }: PremiumAddModalProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleUpgrade = () => {
    onOpenChange(false);
    navigate(getLocalizedPath('/packages', language));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm sm:max-w-md text-center p-8 bg-white/95 backdrop-blur-sm border-amber-100/50 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full shadow-inner ring-4 ring-amber-50">
            <Crown className="w-10 h-10 text-amber-600 drop-shadow-sm" />
          </div>
        </div>

        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800 text-center">
            {language === 'ar' ? 'الترقية إلى المميزة' : 'Upgrade to Premium'}
          </DialogTitle>
          <div className="h-1 w-20 bg-amber-200 mx-auto rounded-full" />
        </DialogHeader>

        <p className="text-gray-600 my-6 text-lg leading-relaxed">
          {language === 'ar'
            ? 'قم بالترقية لفتح جميع المعلومات الغذائية والحصول على تحليل مفصل لنظامك الغذائي.'
            : 'Upgrade to unlock all nutritional information and get detailed analysis of your diet.'}
        </p>

        <DialogFooter className="flex flex-col gap-3 w-full sm:justify-center">
          <Button
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            onClick={handleUpgrade}
          >
            {language === 'ar' ? 'احصل على المميزة الآن' : 'Get Premium Now'}
          </Button>
          <Button
            variant="ghost"
            className="w-full text-gray-500 hover:text-gray-700 hover:bg-amber-50"
            onClick={() => onOpenChange(false)}
          >
            {language === 'ar' ? 'لربما لاحقا' : 'Maybe Later'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
