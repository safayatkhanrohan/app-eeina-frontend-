import { baseApi } from '../../API/baseApi';

const TAP_CREATE_CHARGE_PATH =
  import.meta.env.VITE_TAP_CREATE_CHARGE_PATH || '/payments/tap/charge';

export const PackageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivePackages: builder.query({
      query: () => ({
        url: '/packages',
        method: 'GET',
      }),
      providesTags: ['Package' as any],
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
        credentials: 'include',
      }),
      invalidatesTags: ['Package' as any, 'User' as any], // Might affect user status
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET',
      }),
      providesTags: ['Order' as any],
    }),

    createTapCharge: builder.mutation<
      {
        data?: {
          transactionUrl?: string;
          chargeId?: string;
          status?: string;
        };
        message?: string;
      },
      {
        orderId: string;
        tokenId: string;
        redirectUrl?: string;
      }
    >({
      query: (body) => ({
        url: TAP_CREATE_CHARGE_PATH,
        method: 'POST',
        body,
        credentials: 'include',
      }),
      invalidatesTags: ['Order' as any, 'Subscription' as any, 'User' as any],
    }),
  }),
});

export const {
  useGetActivePackagesQuery,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useCreateTapChargeMutation,
} = PackageApi;
