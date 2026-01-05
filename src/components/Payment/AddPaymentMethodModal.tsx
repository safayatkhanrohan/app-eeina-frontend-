/**
 * AddPaymentMethodModal Component
 *
 * A modal that allows users to add a new payment method using Tap Payments SDK.
 * This component reuses the same Tap Card SDK configuration as StartTrialCardForm.
 *
 * FLOW:
 * 1. Load Tap Card SDK dynamically
 * 2. Render secure card input form in modal
 * 3. Tokenize card on submit
 * 4. Send token to backend to save payment method
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  TapCard,
  Currencies,
  Direction,
  Edges,
  Locale,
  Theme,
  tokenize,
} from '@tap-payments/card-sdk';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Loader2, ShieldCheck, CreditCard, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAddPaymentMethodMutation } from '@/redux/Features/PaymentMethods/PaymentMethodsApi';
import { useCreateCustomerMutation } from '@/redux/Features/Payment/PaymentApi';
import { useAppSelector } from '@/hooks/hook';

// Public key - safe to expose in frontend
const TAP_PUBLIC_KEY = import.meta.env.VITE_TAP_PUBLIC_KEY;

export interface AddPaymentMethodModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Callback on successful card addition */
  onSuccess?: () => void;
}

/**
 * AddPaymentMethodModal - Modal for adding a new payment method
 */
export const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  // State
  const [tapReady, setTapReady] = useState(false);
  const [isCardValid, setIsCardValid] = useState(false);
  const [isTokenizing, setIsTokenizing] = useState(false);
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Refs to prevent duplicate API calls
  const processedTokenRef = useRef<string | null>(null);
  const isProcessingRef = useRef(false);

  // Get user info for Tap customer
  const user = useAppSelector((s) => s.auth.user);

  // API mutations
  const [addPaymentMethod, { isLoading: isAddingMethod }] = useAddPaymentMethodMutation();
  const [createCustomer, { isLoading: isCreatingCustomer }] = useCreateCustomerMutation();

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTapReady(false);
      setIsCardValid(false);
      setIsTokenizing(false);
      setTokenId(null);
      setError(null);
      processedTokenRef.current = null;
      isProcessingRef.current = false;
    }
  }, [isOpen]);

  // Ensure customer ID exists before rendering form
  useEffect(() => {
    const ensureCustomer = async () => {
      if (isOpen && user && !(user as any).tapCustomerId && !isCreatingCustomer) {
        try {
          await createCustomer().unwrap();
        } catch (err) {
          console.error('Failed to create Tap customer:', err);
          setError('Failed to initialize payment system. Please refresh.');
        }
      }
    };
    ensureCustomer();
  }, [isOpen, user, createCustomer, isCreatingCustomer]);

  // Customer info for Tap SDK
  const customerFirst = user?.firstName || user?.fullName?.split(' ')?.[0] || 'Customer';
  const customerLast = user?.lastName || user?.fullName?.split(' ')?.slice(1).join(' ') || '';
  const email = user?.email || '';
  const phone = (user as any)?.phone as string | undefined;
  const phoneNormalized = phone?.replace(/\s/g, '') || '';
  const phoneCountryCode = phoneNormalized.startsWith('+')
    ? phoneNormalized.match(/^\+(\d{1,3})/)?.[1] ?? '966'
    : '966';
  const phoneNumber = phoneNormalized.replace(/^\+?\d{1,4}/, '').replace(/\D/g, '') || '';

  // Memoize TapCard props
  const tapTransaction = useMemo(
    () => ({
      amount: 1, // Minimum amount for card validation
      currency: Currencies.SAR,
    }),
    [],
  );

  const tapFields = useMemo(
    () => ({
      cardHolder: true,
    }),
    [],
  );

  const tapCustomer = useMemo(() => {
    const contact: any = {};
    if (email) contact.email = email;
    if (phoneNumber) {
      contact.phone = {
        countryCode: phoneCountryCode,
        number: phoneNumber,
      };
    }

    return {
      name: [
        {
          lang: Locale.EN,
          first: customerFirst,
          last: customerLast || '-',
        },
      ],
      nameOnCard: `${customerFirst} ${customerLast || ''}`.trim(),
      editable: true,
      contact: Object.keys(contact).length > 0 ? contact : undefined,
    };
  }, [customerFirst, customerLast, email, phoneCountryCode, phoneNumber]);

  const tapAddons = useMemo(
    () => ({
      displayPaymentBrands: true,
      loader: true,
      saveCard: false, // Don't auto-save - let backend handle card attachment
    }),
    [],
  );

  const tapInterface = useMemo(
    () => ({
      locale: Locale.EN,
      theme: Theme.LIGHT,
      edges: Edges.CURVED,
      direction: Direction.LTR,
    }),
    [],
  );

  const tapAcceptance = useMemo(
    () => ({
      supportedBrands: ['VISA', 'MASTERCARD', 'AMERICAN_EXPRESS', 'MADA'],
      supportedCards: ['DEBIT', 'CREDIT'],
    }),
    [],
  );

  // Configuration check
  const configError = !TAP_PUBLIC_KEY ? 'Tap public key is missing. Contact support.' : null;

  // Can submit check
  const canSubmit =
    tapReady && isCardValid && !isTokenizing && !isAddingMethod && !tokenId && !configError;

  /**
   * Handle form submission - triggers card tokenization
   */
  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;

    setError(null);
    setIsTokenizing(true);
    processedTokenRef.current = null;
    setTokenId(null);

    try {
      tokenize();
    } catch (e) {
      setIsTokenizing(false);
      console.error('Tap tokenize failed:', e);
      setError('Could not start card processing. Please try again.');
      toast.error('Could not process card. Please try again.');
    }
  }, [canSubmit]);

  /**
   * Process token - send to backend to save payment method
   */
  useEffect(() => {
    const processToken = async () => {
      // Guard against duplicate calls - check both ref and processing state
      if (!tokenId) return;
      if (processedTokenRef.current === tokenId) {
        console.log('Token already processed, skipping:', tokenId);
        return;
      }
      if (isProcessingRef.current) {
        console.log('Already processing, skipping:', tokenId);
        return;
      }

      // Mark as processing BEFORE async operation
      isProcessingRef.current = true;
      processedTokenRef.current = tokenId;

      console.log('Processing token:', tokenId);

      try {
        await addPaymentMethod({ tokenId }).unwrap();
        toast.success('Payment method added successfully!');
        onSuccess?.();
        onClose();
      } catch (err: any) {
        console.error('Add payment method failed:', err);
        const errorMessage =
          err?.data?.message || 'Failed to add payment method. Please try again.';
        setError(errorMessage);
        toast.error(errorMessage);

        // Reset for retry - allow new token to be processed
        setTokenId(null);
        processedTokenRef.current = null;
      } finally {
        isProcessingRef.current = false;
      }
    };

    processToken();
  }, [tokenId, addPaymentMethod, onSuccess, onClose]);

  // Loading state
  const isProcessing = isTokenizing || isAddingMethod || !!tokenId;

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primaryColor" />
            <DialogTitle>Add Payment Method</DialogTitle>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Add a new credit or debit card for future payments.
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Security Badge */}
          <div className="bg-blue-50 p-3 rounded-md flex items-center gap-3 text-blue-700 border border-blue-100">
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Your card is secure</p>
              <p className="text-blue-600 text-xs">
                Card details are encrypted and securely processed by Tap Payments.
              </p>
            </div>
          </div>

          {/* Error Display */}
          {(error || configError) && (
            <div className="bg-red-50 p-3 rounded-md flex items-start gap-2 text-red-700 border border-red-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm">{error || configError}</div>
            </div>
          )}

          {/* Tap Card Form */}
          {!configError && isOpen && (
            <div className="space-y-4">
              <TapCard
                publicKey={TAP_PUBLIC_KEY}
                transaction={tapTransaction}
                fields={tapFields}
                customer={tapCustomer}
                addons={tapAddons}
                interface={tapInterface}
                acceptance={tapAcceptance}
                onReady={() => {
                  setTapReady(true);
                  setError(null);
                }}
                onValidInput={(v: any) => {
                  if (typeof v === 'boolean') {
                    setIsCardValid(v);
                    return;
                  }
                  const isValid = v?.isAllInputsValid ?? true;
                  setIsCardValid(Boolean(isValid));
                }}
                onInvalidInput={(error: any) => {
                  if (error) {
                    setIsCardValid(false);
                  }
                }}
                onError={(data: any) => {
                  setIsTokenizing(false);
                  console.error('Tap card SDK error:', data);
                  setError('Card form error. Please check your card details.');
                }}
                onSuccess={(data: any) => {
                  setIsTokenizing(false);
                  console.log(
                    'AddPaymentMethodModal - Tap SDK onSuccess FULL response:',
                    JSON.stringify(data, null, 2),
                  );

                  const extractedTokenId =
                    data?.id ||
                    data?.token?.id ||
                    data?.tokenId ||
                    data?.data?.id ||
                    data?.data?.token?.id;

                  console.log('AddPaymentMethodModal - Extracted tokenId:', extractedTokenId);

                  if (typeof extractedTokenId === 'string' && extractedTokenId.startsWith('tok_')) {
                    setTokenId(extractedTokenId);
                  } else {
                    console.error(
                      'AddPaymentMethodModal - Invalid token format:',
                      extractedTokenId,
                      'Full data:',
                      data,
                    );
                    setError('Failed to get card token. Please try again.');
                    toast.error('Failed to process card. Please try again.');
                  }
                }}
              />

              {/* Submit Button */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={onClose}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-primaryColor hover:bg-primaryColor/90"
                  disabled={!canSubmit}
                  onClick={handleSubmit}
                >
                  {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isProcessing ? 'Adding...' : 'Add Card'}
                </Button>
              </div>

              {/* Processing Indicator */}
              {isProcessing && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isTokenizing ? 'Securing your card...' : 'Saving payment method...'}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentMethodModal;
