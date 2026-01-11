import { baseApi } from '../../API/baseApi';

/**
 * Authentication API endpoints
 * Handles all auth-related operations including:
 * - User registration and login
 * - Email OTP verification
 * - Phone SMS OTP verification
 * - Password management
 */
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== LOGIN & SIGNUP ====================
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags: ['User'],
    }),

    signup: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags: ['User'],
    }),

    logOut: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    // ==================== PASSWORD MANAGEMENT ====================
    forgotPassword: builder.mutation({
      query: (forgotPasswordData) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: forgotPasswordData,
        credentials: 'include',
      }),
    }),

    resetPassword: builder.mutation({
      query: (resetPasswordData) => ({
        url: `/auth/reset-password`,
        method: 'POST',
        body: resetPasswordData,
        credentials: 'include',
      }),
    }),

    resendResetOtp: builder.mutation({
      query: ({ email }) => ({
        url: `/auth/resend-reset-otp`,
        method: 'POST',
        body: { email },
        credentials: 'include',
      }),
    }),

    verifyResetOtp: builder.mutation({
      query: (body) => ({
        url: `/auth/verify-reset-otp`,
        method: 'POST',
        body: body,
        credentials: 'include',
      }),
    }),

    // ==================== EMAIL OTP VERIFICATION ====================
    /**
     * Verify email OTP
     * @param body - { email: string, otp: string }
     */
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: `/auth/verify-email-otp`,
        method: 'POST',
        body: body,
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),

    /**
     * Resend email OTP
     * @param email - User email
     */
    resendOtp: builder.mutation({
      query: ({ email }) => ({
        url: `/auth/resend-email-otp`,
        method: 'POST',
        body: { email },
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),

    // ==================== PHONE SMS OTP VERIFICATION ====================
    /**
     * Send phone OTP via SMS
     * @param body - { phone: string, email: string }
     */
    sendPhoneOtp: builder.mutation({
      query: (body) => ({
        url: `/auth/send-phone-otp`,
        method: 'POST',
        body: body,
        credentials: 'include',
      }),
    }),

    /**
     * Verify phone OTP
     * @param body - { phone: string, otp: string, email: string }
     */
    verifyPhoneOtp: builder.mutation({
      query: (body) => ({
        url: `/auth/verify-phone-otp`,
        method: 'POST',
        body: body,
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),

    /**
     * Resend phone OTP
     * @param body - { phone: string, email: string }
     */
    resendPhoneOtp: builder.mutation({
      query: (body) => ({
        url: `/auth/resend-phone-otp`,
        method: 'POST',
        body: body,
        credentials: 'include',
      }),
    }),

    /**
     * Get verification status (email and phone)
     * @param email - User email
     */
    getVerificationStatus: builder.query({
      query: (email) => ({
        url: `/auth/verification-status?email=${encodeURIComponent(email)}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  // Login & Signup
  useLoginMutation,
  useSignupMutation,
  useLogOutMutation,
  // Password Management
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResendResetOtpMutation,
  useVerifyResetOtpMutation,
  // Email OTP
  useResendOtpMutation,
  useVerifyOtpMutation,
  // Phone SMS OTP
  useSendPhoneOtpMutation,
  useVerifyPhoneOtpMutation,
  useResendPhoneOtpMutation,
  // Verification Status
  useGetVerificationStatusQuery,
  useLazyGetVerificationStatusQuery,
} = authApi;
