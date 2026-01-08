/**
 * Auth Module Exports
 *
 * Exports all authentication-related pages:
 * - Login: User login page
 * - Signup: User registration page
 * - VerifyOtp: Email OTP verification page
 * - VerifyPhoneOtp: Phone SMS OTP verification page
 * - Forgetpassword: Password recovery initiation page
 * - Resetpassword: Password reset page
 * - OAuthCallback: OAuth provider callback handler
 */

export { Forgetpassword } from './Forgetpassword';
export { Login } from './Login';
export { Signup } from './Signup';
export { VerifyOtp } from './VerifiOtp';
export { VerifyPhoneOtp } from './VerifyPhoneOtp';
export { OAuthCallback } from './OAuthCallback';
export { Resetpassword } from './Resetpassword';
