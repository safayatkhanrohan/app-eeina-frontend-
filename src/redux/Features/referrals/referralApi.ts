import { baseApi } from '@/redux/API/baseApi';

const referralApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    referralsTrack: builder.mutation({
      query: (data) => ({
        url: '/referrals/track',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useReferralsTrackMutation } = referralApi;
