import { useState } from 'react';
import {
  useGetActivePackagesQuery,
} from '@/redux/Features/Package/PackageApi';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/ui/Loader';
import PackagePlan from './components/PackagePlan';
import SecurePayments from './components/SecurePyament';
import PackageFAQ from './components/PackageFAQ';
import { useGetUserSubscriptionsQuery } from '@/redux/Features/Subscriptions/subscriptionApi';
import { useAppSelector } from '@/hooks/hook';
import { toast } from 'sonner';

const Packages = () => {
  const [interval, setInterval] = useState<'monthly' | 'yearly'>('monthly');
  const { data: packagesData, isLoading, error } = useGetActivePackagesQuery({});
  const { data: subscriptionsData } = useGetUserSubscriptionsQuery({});
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);

  const packages = packagesData?.data || [];

  /**
   * Handle "Start Free Trial" or "Buy Now" click
   * For free trial flow: Navigate directly to /start-trial with package info
   * No order creation needed - that's handled after payment
   */
  const handleStartTrial = (pkg: any) => {
    // Require authentication
    if (!user) {
      toast.info('Please login to start your free trial');
      navigate(`/login?redirect=/start-trial?package=${pkg._id}&interval=${interval}`);
      return;
    }

    // Navigate to trial page with package and interval
    navigate(`/start-trial?package=${pkg._id}&interval=${interval}`);
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
        onStartTrial={handleStartTrial}
      />
      <SecurePayments />
      <PackageFAQ />
    </div>
  );
};

export default Packages;
