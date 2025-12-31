import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Subscription } from '../types';
import { ArrowUpCircle, ArrowDownCircle, RefreshCw, XCircle, Power } from 'lucide-react';

interface SubscriptionActionsProps {
  subscription: Subscription;
  onUpgrade: () => void;
  onDowngrade: () => void;
  onSwitchCycle: () => void;
  onCancel: () => void;
  onReactivate: () => void;
  onRetryPayment?: () => void;
}

export const SubscriptionActions: React.FC<SubscriptionActionsProps> = ({
  subscription,
  onUpgrade,
  onDowngrade,
  onSwitchCycle,
  onCancel,
  onReactivate,
  onRetryPayment,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Subscription Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        {subscription.status === 'past_due' && (
          <Button
            onClick={onRetryPayment}
            className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            <RefreshCw className="h-4 w-4" /> Retry Payment
          </Button>
        )}
        {subscription.status === 'active' || subscription.status === 'trialing' ? (
          <>
            <Button onClick={onUpgrade} className="flex items-center gap-2">
              <ArrowUpCircle className="h-4 w-4" /> Upgrade Plan
            </Button>
            <Button onClick={onDowngrade} variant="outline" className="flex items-center gap-2">
              <ArrowDownCircle className="h-4 w-4" /> Downgrade Plan
            </Button>
            <Button onClick={onSwitchCycle} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" /> Switch Billing Cycle
            </Button>
            {!subscription.cancelAtPeriodEnd && (
              <Button onClick={onCancel} variant="destructive" className="flex items-center gap-2">
                <XCircle className="h-4 w-4" /> Cancel Subscription
              </Button>
            )}
            {subscription.cancelAtPeriodEnd && (
              <Button
                onClick={onReactivate}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Power className="h-4 w-4" /> Reactivate Subscription
              </Button>
            )}
          </>
        ) : (
          <Button
            onClick={onReactivate}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Power className="h-4 w-4" /> Reactivate Subscription
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
