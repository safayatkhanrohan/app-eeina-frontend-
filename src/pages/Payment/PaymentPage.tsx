import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useCreateTapChargeMutation,
  useGetOrderByIdQuery,
} from '@/redux/Features/Package/PackageApi';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useAppSelector } from '@/hooks/hook';
const TAP_PUBLIC_KEY = import.meta.env.VITE_TAP_PUBLIC_KEY;

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data: orderResponse, isLoading, error } = useGetOrderByIdQuery(orderId);

  const user = useAppSelector((s) => s.auth.user);
  const [createTapCharge, { isLoading: isCreatingCharge }] = useCreateTapChargeMutation();
  const [tapReady, setTapReady] = useState(false);
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [isCardValid, setIsCardValid] = useState(false);
  const [isTokenizing, setIsTokenizing] = useState(false);
  const startedChargeForTokenRef = useRef<string | null>(null);

  const order = orderResponse?.data;

  const amount = useMemo(() => {
    const total = Number(order?.pricingSnapshot?.total ?? 0);
    return Number.isFinite(total) ? total : 0;
  }, [order?.pricingSnapshot?.total]);

  useEffect(() => {
    if (!order) return;
    if (order.status === 'paid') {
      toast.success('Order is already paid');
      navigate(`/order-summary/${order._id}`);
      return;
    }
  }, [order, navigate]);

  const customerFirst = user?.firstName || user?.fullName?.split(' ')?.[0] || 'Customer';
  const customerLast = user?.lastName || user?.fullName?.split(' ')?.slice(1).join(' ') || '';
  const email = user?.email || '';

  const phone = (user as any)?.phone as string | undefined;
  const phoneNormalized = phone?.replace(/\s/g, '') || '';
  const phoneCountryCode = phoneNormalized.startsWith('+')
    ? (phoneNormalized.match(/^\+(\d{1,3})/)?.[1] ?? '966')
    : '966';
  const phoneNumber = phoneNormalized.replace(/^\+?\d{1,4}/, '').replace(/\D/g, '') || '0000000000';

  const tapCurrency = useMemo(() => {
    const currency = order?.currency;
    if (!currency) return null;
    const normalized = String(currency).toUpperCase();
    const mapped = (Currencies as any)[normalized];
    return mapped ?? null;
  }, [order?.currency]);

  const paymentConfigError = useMemo(() => {
    if (!TAP_PUBLIC_KEY) return 'Tap public key is missing. Set VITE_TAP_PUBLIC_KEY';
    if (!Number.isFinite(amount) || amount <= 0) return 'Invalid payment amount';
    if (!tapCurrency) return `Unsupported currency for Tap: ${String(order?.currency ?? '')}`;
    return null;
  }, [amount, order?.currency, tapCurrency]);

  const canPay = tapReady && isCardValid && !isCreatingCharge && !isTokenizing && !tokenId;

  const handlePay = () => {
    if (paymentConfigError) {
      toast.error(paymentConfigError);
      return;
    }
    if (!tapReady) {
      toast.error('Payment form is not ready yet.');
      return;
    }
    if (!isCardValid) {
      toast.error('Please complete valid card details.');
      return;
    }

    startedChargeForTokenRef.current = null;
    setTokenId(null);
    setIsTokenizing(true);
    try {
      tokenize();
    } catch (e) {
      setIsTokenizing(false);
      console.error('Tap tokenize failed', e);
      toast.error('Could not start tokenization. Please try again.');
    }
  };

  useEffect(() => {
    const run = async () => {
      if (!order || !tokenId) return;
      if (startedChargeForTokenRef.current === tokenId) return;
      startedChargeForTokenRef.current = tokenId;
      try {
        const redirectUrl = `${window.location.origin}/payment/callback/${order._id}`;
        const res = await createTapCharge({
          orderId: order._id,
          tokenId,
          redirectUrl,
        }).unwrap();

        const transactionUrl = res?.data?.transactionUrl;
        const status = res?.data?.status;
        if (transactionUrl) {
          window.location.href = transactionUrl;
          return;
        }

        if (status === 'paid' || status === 'success') {
          navigate(`/payment/success/${order._id}`);
          return;
        }

        toast.error(res?.message || 'Payment initiation failed');
      } catch (err: any) {
        console.error('Tap charge init failed', err);
        toast.error(err?.data?.message || 'Payment initiation failed');
      }
    };

    run();
  }, [order, tokenId, createTapCharge, navigate]);

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

          <div className="space-y-3">
            {paymentConfigError ? (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {paymentConfigError}
              </div>
            ) : (
              <TapCard
                publicKey={TAP_PUBLIC_KEY}
                transaction={{
                  amount,
                  currency: tapCurrency,
                }}
                fields={{
                  cardHolder: true,
                }}
                customer={{
                  // Only pass id if user already has a Tap customer ID
                  ...(((user as any)?.tapCustomerId) && { id: (user as any).tapCustomerId }),
                  name: [
                    {
                      lang: Locale.EN,
                      first: customerFirst,
                      last: customerLast,
                    },
                  ],
                  nameOnCard: `${customerFirst}${customerLast ? ` ${customerLast}` : ''}`,
                  editable: true,
                  contact: {
                    email,
                    phone: {
                      countryCode: phoneCountryCode,
                      number: phoneNumber,
                    },
                  },
                }}
                addons={{
                  displayPaymentBrands: true,
                  loader: true,
                  saveCard: false,
                }}
                interface={{
                  locale: Locale.EN,
                  theme: Theme.LIGHT,
                  edges: Edges.CURVED,
                  direction: Direction.LTR,
                }}
                onReady={() => setTapReady(true)}
                onValidInput={(v: any) => {
                  if (typeof v === 'boolean') {
                    setIsCardValid(v);
                    return;
                  }
                  setIsCardValid(Boolean((v as any)?.isAllInputsValid));
                }}
                onInvalidInput={() => setIsCardValid(false)}
                onError={(data: any) => {
                  setIsTokenizing(false);
                  console.error('Tap card SDK error', data);
                  toast.error('Card form error. Please check card details.');
                }}
                onSuccess={(data: any) => {
                  setIsTokenizing(false);
                  const extractedTokenId =
                    data?.id || data?.token?.id || data?.tokenId || data?.data?.id || data?.data?.token?.id;
                  if (typeof extractedTokenId === 'string') {
                    startedChargeForTokenRef.current = null;
                    setTokenId(extractedTokenId);
                  } else {
                    toast.error('Failed to get card token from Tap');
                  }
                }}
              />
            )}

            {/* <Button type="button" className="w-full" disabled={!canPay} onClick={handlePay}>
              {(isTokenizing || isCreatingCharge || !!tokenId) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Pay
            </Button> */}
            {(isCreatingCharge || !!tokenId) && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Starting secure payment…</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
