/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from '../../API/baseApi';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<any, void>({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    editProfile: builder.mutation({
      query: ({ ...data }) => ({
        url: '/user/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    DeleteAccount: builder.mutation<void, void>({
      query: () => ({
        url: '/user/delete-account',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    getTopCreator: builder.query<any, void>({
      query: () => ({
        url: '/user/top-creators',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getCreatedByProfile: builder.query({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    verifyEmail: builder.mutation({
      query: ({ email, otp }) => ({
        url: '/user/email-verification',
        method: 'POST',
        body: { email, otp },
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),
    resendEmailOtp: builder.mutation({
      query: ({ email }) => ({
        url: '/user/resend-email-otp',
        method: 'POST',
        body: { email },
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),

    followUser: builder.mutation({
      query: (id) => ({
        url: `/user/follow/${id}`,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useVerifyEmailMutation,
  useResendEmailOtpMutation,
  useGetMeQuery,
  useEditProfileMutation,

  useGetCreatedByProfileQuery,

  useGetTopCreatorQuery,

  useFollowUserMutation,
  useDeleteAccountMutation,
} = userApi;
