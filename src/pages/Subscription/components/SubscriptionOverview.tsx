import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Subscription, Plan } from '../types';
import { Calendar, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SubscriptionOverviewProps {
  subscription: Subscription;
  plan: Plan;
}

export const SubscriptionOverview: React.FC<SubscriptionOverviewProps> = ({
  subscription,
  plan,
}) => {
  const { t } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'trialing':
        return 'bg-blue-500';
      case 'past_due':
        return 'bg-red-500';
      case 'canceled':
      case 'expired':
        return 'bg-gray-500';
      case 'cancel_at_period_end':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Current Plan: {plan.name}</span>
          <Badge className={`${getStatusColor(subscription.status)} text-white`}>
            {subscription.status.replace('_', ' ').toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Price</p>
              <p className="text-lg font-semibold">
                {plan.currency.toUpperCase()} {plan.price} / {plan.interval}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Next Payment</p>
              <p className="text-lg font-semibold">
                {subscription.cancelAtPeriodEnd
                  ? 'No upcoming payment'
                  : formatDate(subscription.nextPaymentDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Start Date</p>
              <p className="text-lg font-semibold">{formatDate(subscription.currentPeriodStart)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Auto-Renew</p>
              <p className="text-lg font-semibold">
                {subscription.cancelAtPeriodEnd ? 'OFF' : 'ON'}
              </p>
            </div>
          </div>
        </div>

        {subscription.status === 'trialing' && subscription.trialEnd && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-700">
            Trial ends on {formatDate(subscription.trialEnd)}.
            {Math.ceil(
              (new Date(subscription.trialEnd).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24),
            )}{' '}
            days remaining.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
