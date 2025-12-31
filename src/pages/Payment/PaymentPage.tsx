import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOrderByIdQuery } from '@/redux/Features/Package/PackageApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

declare global {
  interface Window {
    Moyasar: any;
  }
}

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data: orderResponse, isLoading, error } = useGetOrderByIdQuery(orderId);

  const order = orderResponse?.data;
  const packageDetails = order?.packageId;

  useEffect(() => {
    if (!order) return;
    if (order.status === 'paid') {
      toast.success('Order is already paid');
      navigate(`/order-summary/${order._id}`);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.moyasar.com/mpf/1.14.0/moyasar.js';
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.href = 'https://cdn.moyasar.com/mpf/1.14.0/moyasar.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const initMoyasar = () => {
      if (window.Moyasar) {
        try {
          window.Moyasar.init({
            element: '.mysr-form',
            amount: Math.round(order.pricingSnapshot.total * 100), // in halalas
            currency: order.currency,
            description: `Subscription: ${packageDetails?.name?.en}`,
            publishable_api_key: import.meta.env.VITE_MOYASAR_PUBLISHABLE_KEY,
            callback_url: `${window.location.origin}/payment/callback/${order._id}`, // Redirect back to summary after payment
            methods: ['creditcard', 'stcpay'],
            metadata: {
              orderId: order._id,
            },
            on_completed: (payment: any) => {
              console.log('Payment completed:', payment);
            },
          });
        } catch (e) {
          console.error('Moyasar init failed', e);
        }
      }
    };

    script.onload = initMoyasar;

    return () => {
      // Cleanup if needed
      // Note: removing script tag might breaks navigation if SPA
    };
  }, [order, packageDetails, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 gap-4">
        <p className="text-red-500 text-lg">Failed to load order details for payment.</p>
        <Button variant="outline" onClick={() => navigate('/packages')}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl">Secure Payment</CardTitle>
          </div>
          <CardDescription>Complete your purchase safely.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-md flex items-center gap-3 text-blue-700 mb-4 border border-blue-100">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-sm font-medium">Your payment is encrypted and secure.</span>
          </div>

          <div className="flex justify-between items-center text-sm font-medium text-gray-700 border-b pb-4">
            <span>Total to Pay</span>
            <span className="text-xl text-gray-900">
              ${order.pricingSnapshot?.total?.toFixed(2)}
            </span>
          </div>

          {/* Moyasar Form Container */}
          <div className="mysr-form"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
