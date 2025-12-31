import React, { useState } from 'react';
import { SubscriptionOverview } from './components/SubscriptionOverview';
import { SubscriptionActions } from './components/SubscriptionActions';
import { PaymentMethods } from './components/PaymentMethods';
import { BillingHistory } from './components/BillingHistory';
import { Subscription, Plan, PaymentMethod, Invoice } from './types';
import { toast } from 'sonner';

// Mock Data
const MOCK_PLAN: Plan = {
  id: 'price_premium_monthly',
  name: 'Premium Plan',
  price: 9.99,
  currency: 'USD',
  interval: 'month',
  features: ['Unlimited Recipes', 'Meal Planning', 'Nutritional Analysis'],
};

const MOCK_SUBSCRIPTION: Subscription = {
  id: 'sub_123456',
  planId: 'price_premium_monthly',
  status: 'active',
  currentPeriodStart: '2023-12-01T00:00:00Z',
  currentPeriodEnd: '2024-01-01T00:00:00Z',
  cancelAtPeriodEnd: false,
  nextPaymentDate: '2024-01-01T00:00:00Z',
};

const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm_1',
    type: 'card',
    brand: 'Visa',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
  },
  {
    id: 'pm_2',
    type: 'card',
    brand: 'Mastercard',
    last4: '5555',
    expiryMonth: 10,
    expiryYear: 2024,
    isDefault: false,
  },
];

const MOCK_INVOICES: Invoice[] = [
  {
    id: 'in_1',
    number: 'INV-001',
    date: '2023-12-01T00:00:00Z',
    status: 'paid',
    amount: 9.99,
    currency: 'USD',
    pdfUrl: '#',
    items: [{ description: 'Premium Plan - Monthly', amount: 9.99 }],
  },
  {
    id: 'in_2',
    number: 'INV-002',
    date: '2023-11-01T00:00:00Z',
    status: 'paid',
    amount: 9.99,
    currency: 'USD',
    pdfUrl: '#',
    items: [{ description: 'Premium Plan - Monthly', amount: 9.99 }],
  },
];

export const SubscriptionPage: React.FC = () => {
  const [subscription, setSubscription] = useState<Subscription>(MOCK_SUBSCRIPTION);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(MOCK_PAYMENT_METHODS);
  const [invoices] = useState<Invoice[]>(MOCK_INVOICES);

  const handleUpgrade = () => {
    toast.info('Upgrade flow initiated');
    // Implement upgrade logic
  };

  const handleDowngrade = () => {
    toast.info('Downgrade flow initiated');
    // Implement downgrade logic
  };

  const handleSwitchCycle = () => {
    toast.info('Switching billing cycle...');
    // Implement switch cycle logic
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      setSubscription((prev) => ({
        ...prev,
        cancelAtPeriodEnd: true,
        status: 'cancel_at_period_end',
      }));
      toast.success('Subscription scheduled for cancellation.');
    }
  };

  const handleReactivate = () => {
    setSubscription((prev) => ({
      ...prev,
      cancelAtPeriodEnd: false,
      status: 'active',
    }));
    toast.success('Subscription reactivated!');
  };

  const handleRetryPayment = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: 'Retrying payment...',
      success: 'Payment successful! Subscription active.',
      error: 'Payment failed. Please check your payment method.',
    });
    // Simulate success after delay
    setTimeout(() => {
      setSubscription((prev) => ({ ...prev, status: 'active' }));
    }, 2000);
  };

  const handleAddPaymentMethod = () => {
    toast.info('Add payment method modal would open here.');
  };

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id));
    toast.success('Payment method removed.');
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      })),
    );
    toast.success('Default payment method updated.');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Subscription & Billing</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <SubscriptionOverview subscription={subscription} plan={MOCK_PLAN} />
          <SubscriptionActions
            subscription={subscription}
            onUpgrade={handleUpgrade}
            onDowngrade={handleDowngrade}
            onSwitchCycle={handleSwitchCycle}
            onCancel={handleCancel}
            onReactivate={handleReactivate}
            onRetryPayment={handleRetryPayment}
          />
          <BillingHistory invoices={invoices} />
        </div>

        <div className="lg:col-span-1">
          <PaymentMethods
            paymentMethods={paymentMethods}
            onAddMethod={handleAddPaymentMethod}
            onRemoveMethod={handleRemovePaymentMethod}
            onSetDefault={handleSetDefaultPaymentMethod}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
