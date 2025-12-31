/**
 * PremiumAd Component
 *
 * Premium upgrade advertisement card
 * Displayed in the right sidebar
 */

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PremiumAdProps {
  language: string;
  t: any;
}

export const PremiumAd: React.FC<PremiumAdProps> = ({ language, t }) => {
  return (
    <Card className="bg-gradient-to-br from-primaryColor to-[#1c9a40] rounded-2xl border-0 h-60 sm:h-80 overflow-hidden">
      <CardContent className="p-0 h-full relative">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4 sm:p-8">
          {/* AD Label */}
          <div className="text-white text-4xl sm:text-6xl font-extrabold mb-2 sm:mb-4 opacity-90">
            AD
          </div>

          {/* Title */}
          <div className="text-white text-base sm:text-lg font-semibold mb-1 sm:mb-2">
            {t.home.premium_recipes}
          </div>

          {/* Description */}
          <div className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-4">
            {language === 'ar' ? 'افتح وصفات الطهاة الحصرية' : 'Unlock exclusive chef recipes'}
          </div>

          {/* Upgrade Button */}
          <Button
            variant="outline"
            className="border-white text-primaryColor hover:bg-[#1d9541] hover:text-white transition-colors text-sm"
          >
            {t.home.upgrade_now}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
