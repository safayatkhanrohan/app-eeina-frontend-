import { baseApi } from '../../API/baseApi';

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
  }),
});

export const { useGetActivePackagesQuery, useCreateOrderMutation, useGetOrderByIdQuery } =
  PackageApi;
