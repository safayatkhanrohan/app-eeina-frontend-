/**
 * Payment API - Redux RTK Query endpoints for Tap payment operations
 * 
 * This module provides API hooks for:
 * - Starting free trials with card verification
 * - Managing subscriptions
 * - Managing saved cards
 * 
 * SECURITY:
 * - Only sends card tokens (tok_xxx) to backend
 * - Never handles raw card data
 * - All sensitive operations happen on backend with secret key
 */

import { baseApi } from '../../API/baseApi';

/**
 * Response types
 */
interface TapCard {
  id: string;
  brand: string;
  lastFour: string;
  expMonth?: number;
  expYear?: number;
  isDefault?: boolean;
}

interface SubscriptionResponse {
  id: string;
  tapSubscriptionId?: string;
  status: 'active' | 'trial' | 'past_due' | 'cancelled' | 'expired';
  interval: 'monthly' | 'yearly';
  trialEndsAt?: string;
  endsAt: string;
}

interface StartTrialResponse {
  success: boolean;
  subscription: SubscriptionResponse;
  card: TapCard;
}

interface SubscriptionStatusResponse {
  hasSubscription: boolean;
  subscription: {
    id: string;
    status: string;
    package: {
      _id: string;
      name: string;
      slug: string;
    };
    interval: string;
    startsAt: string;
    endsAt: string;
    nextBillAt: string;
    autoRenew: boolean;
    tapStatus?: string;
  } | null;
}

interface CardsResponse {
  cards: TapCard[];
}

/**
 * Payment API endpoints
 */
export const PaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Create or retrieve Tap customer ID
     * 
     * Used to initialize Tap SDK with a valid customer ID
     */
    createCustomer: builder.mutation<{ data: { tapCustomerId: string }; message: string }, void>({
      query: () => ({
        url: '/payments/customer',
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['User' as any],
    }),

    /**
     * Start a free trial with card verification
     * 
     * This endpoint:
     * 1. Creates/retrieves Tap customer
     * 2. Saves the card
     * 3. Verifies the card (no charge)
     * 4. Creates subscription with trial period
     * 
     * @param tokenId - Card token from Tap SDK (tok_xxx)
     * @param packageId - Package/plan to subscribe to
     * @param interval - Billing interval (monthly/yearly)
     */
    startTrial: builder.mutation<
      { data: StartTrialResponse; message: string },
      {
        tokenId: string;
        packageId: string;
        interval?: 'monthly' | 'yearly';
      }
    >({
      query: (body) => ({
        url: '/payments/start-trial',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      invalidatesTags: ['Subscription' as any, 'User' as any],
    }),

    /**
     * Cancel the current subscription
     * 
     * @param immediately - If true, cancel now. If false, cancel at period end.
     */
    cancelSubscription: builder.mutation<
      { data: { success: boolean; subscription: SubscriptionResponse }; message: string },
      { immediately?: boolean }
    >({
      query: (body) => ({
        url: '/payments/cancel-subscription',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      invalidatesTags: ['Subscription' as any, 'User' as any],
    }),

    /**
     * Get the current subscription status
     */
    getSubscriptionStatus: builder.query<
      { data: SubscriptionStatusResponse; message: string },
      void
    >({
      query: () => ({
        url: '/payments/subscription-status',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Subscription' as any],
    }),

    /**
     * Get saved cards for the current user
     */
    getSavedCards: builder.query<
      { data: CardsResponse; message: string },
      void
    >({
      query: () => ({
        url: '/payments/cards',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Cards' as any],
    }),

    /**
     * Delete a saved card
     * 
     * @param cardId - Card ID to delete (card_xxx)
     */
    deleteCard: builder.mutation<
      { data: { deleted: boolean }; message: string },
      string
    >({
      query: (cardId) => ({
        url: `/payments/cards/${cardId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Cards' as any],
    }),
  }),
});

/**
 * Export hooks for use in components
 * 
 * @example
 * ```tsx
 * // Start a trial
 * const [startTrial, { isLoading }] = useStartTrialMutation();
 * await startTrial({ tokenId: 'tok_xxx', packageId: 'pkg_123' });
 * 
 * // Get subscription status
 * const { data: status } = useGetSubscriptionStatusQuery();
 * 
 * // Cancel subscription
 * const [cancel] = useCancelSubscriptionMutation();
 * await cancel({ immediately: false });
 * ```
 */
export const {
  useStartTrialMutation,
  useCancelSubscriptionMutation,
  useGetSubscriptionStatusQuery,
  useGetSavedCardsQuery,
  useDeleteCardMutation,
  useCreateCustomerMutation,
} = PaymentApi;
