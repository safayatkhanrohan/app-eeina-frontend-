import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PaymentMethod } from '../types';
import { CreditCard, Trash2, Star, Plus } from 'lucide-react';

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  onAddMethod: () => void;
  onRemoveMethod: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  paymentMethods,
  onAddMethod,
  onRemoveMethod,
  onSetDefault,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Payment Methods</CardTitle>
        <Button onClick={onAddMethod} size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add New
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-100 rounded-full">
                <CreditCard className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium capitalize">
                  {method.brand} •••• {method.last4}
                </p>
                <p className="text-sm text-gray-500">
                  Expires {method.expiryMonth}/{method.expiryYear}
                </p>
              </div>
              {method.isDefault && (
                <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  Default
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!method.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSetDefault(method.id)}
                  className="text-gray-600 hover:text-primary"
                >
                  Set Default
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveMethod(method.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                disabled={method.isDefault && paymentMethods.length > 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {paymentMethods.length === 0 && (
          <p className="text-gray-500 text-center py-4">No payment methods saved.</p>
        )}
      </CardContent>
    </Card>
  );
};
