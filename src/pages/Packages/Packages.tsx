import { useState } from 'react';
import {
  useGetActivePackagesQuery,
  useCreateOrderMutation,
} from '@/redux/Features/Package/PackageApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/ui/Loader';
import PackagePlan from './components/PackagePlan';
import SecurePayments from './components/SecurePyament';
import PackageFAQ from './components/PackageFAQ';
import { useGetUserSubscriptionsQuery } from '@/redux/Features/Subscriptions/subscriptionApi';

const Packages = () => {
  const [interval, setInterval] = useState<'monthly' | 'yearly'>('monthly');
  const { data: packagesData, isLoading, error } = useGetActivePackagesQuery({});
  const { data: subscriptionsData } = useGetUserSubscriptionsQuery({});
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const packages = packagesData?.data || [];

  const handleBuyNow = async (pkg: any) => {
    try {
      const orderData = {
        packageId: pkg._id,
        interval: interval,
        currency: 'USD',
      };
      const response = await createOrder(orderData).unwrap();

      const orderId = response.data._id;
      navigate(`/order-summary/${orderId}`);

      console.log('Order created:', response);
    } catch (err: any) {
      console.error('Failed to create order:', err);
      toast.error(err?.data?.message || 'Failed to create order');
      if (err?.status === 401) {
        navigate('/login');
      }
    }
  };

  const subscription = subscriptionsData?.data;
  console.log('User Subscription:', subscription);

  if (isLoading) return <Loader />;
  if (error) return <div className="text-center py-20">Error loading packages</div>;

  return (
    <div className="container max-w-6xl xl2:max-w-7xl mx-auto px-6 py-8 mb-12 md:mb-16 lg:mb-0">
      <PackagePlan
        activePackageId={subscription?.packageId}
        packages={packages}
        interval={interval}
        setInterval={setInterval}
        onBuyNow={handleBuyNow}
        isCreatingOrder={isCreatingOrder}
      />
      <SecurePayments />
      <PackageFAQ />
    </div>
  );
};

export default Packages;
