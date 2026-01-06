import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PaymentFailed = () => {
  const {t} = useLanguage()
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const message = searchParams.get('message') ||`${t.payment.DefaultErrorMessage}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <Card className="w-full max-w-lg shadow-xl border-red-100">
        <CardHeader className="flex flex-col items-center text-center pb-2">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-700">{t.payment.PaymentFailedTitle}</CardTitle>
          <p className="text-gray-500 mt-2">{t.payment.PaymentFailedDescription}</p>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-red-800">
            <p className="font-medium text-sm">{t.payment.ErrorMessageLabel}</p>
            <p className="text-sm mt-1">{decodeURIComponent(message)}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => navigate('/packages')}
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> {t.payment.ChoosePlan}
          </Button>
          <Button
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
            onClick={() => navigate(`/payment/${orderId}`)}
          >
            <RefreshCw className="mr-2 w-4 h-4" />{t.payment.TryAgain}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentFailed;
