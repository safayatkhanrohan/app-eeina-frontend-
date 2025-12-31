import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Checkout = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let storeName = decodeURIComponent(searchParams.get('store') || '');
  storeName = storeName.replace(/_/g, ' ');

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
      <div className="flex flex-col items-center gap-5 mb-8">
        <div className="bg-green-100 rounded-full p-4">
          <CheckCircle className="text-green-600 w-12 h-12" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          {language == 'ar'
            ? 'تمت إضافة العناصر إلى سلة التسوق الخاصة بك'
            : 'Items were added to your cart'}
        </h2>
        <p className="text-gray-500 max-w-md">
          {language == 'ar'
            ? 'تابع إلى المتجر الذي اخترته لاختيار منتجاتك، وترتيب التوصيل، وإتمام الدفع لسلتك.'
            : 'Continue to your selected store to choose your products, arrange delivery, and pay for your cart.'}
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <Button className="bg-primaryColor hover:bg-green-700 text-white rounded-full">
          {language == 'ar' ? 'تابع إلى' : 'Continue to'}
          {' ' + storeName}
        </Button>

        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full"
        >
          {language == 'ar' ? 'الانتقال إلى قائمة التسوق' : 'Go to shopping list'}
        </Button>
      </div>

      <p className="text-sm text-gray-400 mt-6 max-w-xs">
        {language == 'ar'
          ? 'قد تكسب ايناء وشركاؤها عمولات من عمليات الشراء هذه.'
          : 'Eeina and its partners may earn affiliate fees from this purchase.'}
      </p>
    </div>
  );
};

export default Checkout;
