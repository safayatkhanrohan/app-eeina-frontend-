/**
 * JoinCommunityCard Component
 *
 * Call-to-action card for logged-out users to join the community
 * Displayed in the left sidebar
 */

import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface JoinCommunityCardProps {
  language: string;
}

export const JoinCommunityCard: React.FC<JoinCommunityCardProps> = ({ language }) => {
  return (
    <Card className="bg-gradient-to-br from-primaryColor to-[#1c9a40] text-white">
      <CardContent className="p-6 text-center">
        {/* Icon */}
        <User className="w-12 h-12 mx-auto mb-4" />

        {/* Title */}
        <h3 className="font-bold text-lg mb-2">
          {language === 'ar' ? 'انضم إلى مجتمعنا' : 'Join Our Community'}
        </h3>

        {/* Description */}
        <p className="text-sm mb-4 opacity-90">
          {language === 'ar'
            ? 'احصل على وصول حصري إلى آلاف الوصفات ونصائح الطهي'
            : 'Get exclusive access to thousands of recipes and cooking tips'}
        </p>

        {/* Signup Button */}
        <Link to="/signup">
          <Button className="w-full bg-white text-primaryColor hover:bg-gray-100">
            {language === 'ar' ? 'إنشاء حساب' : 'Create Account'}
          </Button>
        </Link>

        {/* Sign In Link */}
        <div className="text-xs mt-4 opacity-80">
          {language === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
          <Link to="/login" className="underline font-semibold">
            {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
