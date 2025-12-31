import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Button } from '../ui/button';
import { Rocket, Construction } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComingSoonProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

const ComingSoon = ({ isOpen, onClose, onOpenChange }: ComingSoonProps) => {
  const { language } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">
            {language === 'ar' ? 'قريباً!' : 'Coming Soon!'}
          </DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-4 mt-4">
          {/* Animated Icon Container */}
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Rocket className="w-10 h-10 text-purple-600" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Construction className="w-6 h-6 text-orange-500" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              {language === 'ar' ? 'نعمل على شيء مثير!' : 'Working on Something Exciting!'}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {language === 'ar'
                ? 'هذه الميزة قيد التطوير حالياً وسوف تكون متاحة قريباً. نحن نعمل بجد لجلب أفضل تجربة لك.'
                : "This feature is under active development and will be available soon. We're working hard to bring you the best experience."}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="pt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-primaryColor to-green-400 h-2 rounded-full w-3/4 animate-pulse"></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {language === 'ar' ? 'جاري التطوير...' : 'In development...'}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-primaryColor hover:bg-[#1c9a40] text-white px-8"
            >
              {language === 'ar' ? 'حسناً' : 'Got It'}
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-gray-400 pt-2">
            {language === 'ar' ? 'ترقبوا التحديثات!' : 'Stay tuned for updates!'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoon;
