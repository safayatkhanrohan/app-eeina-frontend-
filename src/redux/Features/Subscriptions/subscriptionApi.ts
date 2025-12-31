import { baseApi } from '@/redux/API/baseApi';

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserSubscriptions: builder.query({
      query: () => ({
        url: '/subscriptions/me',
        method: 'GET',
      }),
      providesTags: ['Subscription'],
    }),
  }),
});

export const { useGetUserSubscriptionsQuery } = subscriptionApi;
