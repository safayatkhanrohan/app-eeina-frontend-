import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const PaymentCallback = () => {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  console.log('PaymentCallback orderId:', orderId);

  useEffect(() => {
    const status = searchParams.get('status');
    const message = searchParams.get('message');

    if (status === 'paid' || status === 'success') {
      navigate(`/payment/success/${orderId}`);
    } else if (status === 'failed') {
      // Pass the message to the failed page
      const params = new URLSearchParams();
      if (message) params.append('message', message);
      navigate(`/payment/failed/${orderId}?${params.toString()}`);
    } else {
      // If no status is present, verify order status from API or default to failed if unknown
      // For now, redirect to payment page
      toast.error('Payment status unknown. Please try again.');
      navigate(`/payment/${orderId}`);
    }
  }, [orderId, searchParams, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
        <p className="text-gray-500">Processing payment status...</p>
      </div>
    </div>
  );
};

export default PaymentCallback;
