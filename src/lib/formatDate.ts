/**
 * Date Formatting Utilities
 * Provides various date formatting functions for the application
 */

export type DateFormatOptions = {
  locale?: string;
  includeTime?: boolean;
  includeYear?: boolean;
  short?: boolean;
  relative?: boolean;
};

/**
 * Format a date to a readable string
 * @param date - Date object, string, or timestamp
 * @param options - Formatting options
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string | number,
  options: DateFormatOptions = {},
): string => {
  const { locale = 'en', includeTime = false, includeYear = true, short = false } = options;

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: includeYear ? 'numeric' : undefined,
    month: short ? 'short' : 'long',
    day: 'numeric',
  };

  if (includeTime) {
    dateOptions.hour = '2-digit';
    dateOptions.minute = '2-digit';
  }

  return new Intl.DateTimeFormat(locale, dateOptions).format(dateObj);
};

/**
 * Format date to relative time (e.g., "2 hours ago", "3 days ago")
 * @param date - Date object, string, or timestamp
 * @param locale - Locale for formatting (default: 'en')
 * @returns Relative time string
 */
export const formatRelativeTime = (date: Date | string | number, locale: string = 'en'): string => {
  const dateObj = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  // Less than a minute
  if (diffInSeconds < 60) {
    return locale === 'ar' ? 'الآن' : 'just now';
  }

  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    if (locale === 'ar') {
      return `منذ ${minutes} ${minutes === 1 ? 'دقيقة' : 'دقائق'}`;
    }
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    if (locale === 'ar') {
      return `منذ ${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
    }
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  // Less than a week
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    if (locale === 'ar') {
      return `منذ ${days} ${days === 1 ? 'يوم' : 'أيام'}`;
    }
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  // Less than a month
  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    if (locale === 'ar') {
      return `منذ ${weeks} ${weeks === 1 ? 'أسبوع' : 'أسابيع'}`;
    }
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }

  // Less than a year
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    if (locale === 'ar') {
      return `منذ ${months} ${months === 1 ? 'شهر' : 'شهور'}`;
    }
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }

  // Years
  const years = Math.floor(diffInSeconds / 31536000);
  if (locale === 'ar') {
    return `منذ ${years} ${years === 1 ? 'سنة' : 'سنوات'}`;
  }
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
};

/**
 * Format date to short format (e.g., "Jan 15, 2024" or "15/01/2024")
 * @param date - Date object, string, or timestamp
 * @param locale - Locale for formatting
 * @returns Short formatted date
 */
export const formatShortDate = (date: Date | string | number, locale: string = 'en'): string => {
  return formatDate(date, { locale, short: true, includeYear: true });
};

/**
 * Format date to long format (e.g., "January 15, 2024")
 * @param date - Date object, string, or timestamp
 * @param locale - Locale for formatting
 * @returns Long formatted date
 */
export const formatLongDate = (date: Date | string | number, locale: string = 'en'): string => {
  return formatDate(date, { locale, short: false, includeYear: true });
};

/**
 * Format date with time (e.g., "Jan 15, 2024, 2:30 PM")
 * @param date - Date object, string, or timestamp
 * @param locale - Locale for formatting
 * @returns Date with time
 */
export const formatDateTime = (date: Date | string | number, locale: string = 'en'): string => {
  return formatDate(date, { locale, includeTime: true, includeYear: true });
};

/**
 * Format time only (e.g., "2:30 PM")
 * @param date - Date object, string, or timestamp
 * @param locale - Locale for formatting
 * @param use24Hour - Use 24-hour format
 * @returns Formatted time
 */
export const formatTime = (
  date: Date | string | number,
  locale: string = 'en',
  use24Hour: boolean = false,
): string => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: !use24Hour,
  }).format(dateObj);
};

/**
 * Get date range string (e.g., "Jan 15 - Jan 20, 2024")
 * @param startDate - Start date
 * @param endDate - End date
 * @param locale - Locale for formatting
 * @returns Date range string
 */
export const formatDateRange = (
  startDate: Date | string | number,
  endDate: Date | string | number,
  locale: string = 'en',
): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'Invalid Date Range';
  }

  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();

  if (sameMonth && start.getDate() === end.getDate()) {
    return formatDate(start, { locale, short: true });
  }

  const startStr = formatDate(start, {
    locale,
    short: true,
    includeYear: !sameYear,
  });
  const endStr = formatDate(end, { locale, short: true, includeYear: true });

  return `${startStr} - ${endStr}`;
};

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns True if date is today
 */
export const isToday = (date: Date | string | number): boolean => {
  const dateObj = new Date(date);
  const today = new Date();

  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if a date is yesterday
 * @param date - Date to check
 * @returns True if date is yesterday
 */
export const isYesterday = (date: Date | string | number): boolean => {
  const dateObj = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  );
};

/**
 * Check if a date is this week
 * @param date - Date to check
 * @returns True if date is this week
 */
export const isThisWeek = (date: Date | string | number): boolean => {
  const dateObj = new Date(date);
  const now = new Date();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return dateObj >= startOfWeek && dateObj < endOfWeek;
};

/**
 * Format date with context (Today, Yesterday, or date)
 * @param date - Date to format
 * @param locale - Locale for formatting
 * @returns Contextual date string
 */
export const formatContextualDate = (
  date: Date | string | number,
  locale: string = 'en',
): string => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  if (isToday(dateObj)) {
    return locale === 'ar' ? 'اليوم' : 'Today';
  }

  if (isYesterday(dateObj)) {
    return locale === 'ar' ? 'أمس' : 'Yesterday';
  }

  if (isThisWeek(dateObj)) {
    return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(dateObj);
  }

  return formatDate(dateObj, { locale, short: true });
};

/**
 * Get days between two dates
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Number of days between dates
 */
export const daysBetween = (
  startDate: Date | string | number,
  endDate: Date | string | number,
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 0;
  }

  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Add days to a date
 * @param date - Starting date
 * @param days - Number of days to add (can be negative)
 * @returns New date
 */
export const addDays = (date: Date | string | number, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Format date for input fields (YYYY-MM-DD)
 * @param date - Date to format
 * @returns ISO date string
 */
export const formatInputDate = (date: Date | string | number): string => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * Parse date from various formats
 * @param dateString - Date string to parse
 * @returns Date object or null if invalid
 */
export const parseDate = (dateString: string): Date | null => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Get start of day
 * @param date - Date
 * @returns Date at 00:00:00
 */
export const startOfDay = (date: Date | string | number): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * Get end of day
 * @param date - Date
 * @returns Date at 23:59:59
 */
export const endOfDay = (date: Date | string | number): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * Format expiry date or countdown
 * @param expiryDate - Expiry date
 * @param locale - Locale for formatting
 * @returns Expiry message
 */
export const formatExpiryDate = (
  expiryDate: Date | string | number,
  locale: string = 'en',
): string => {
  const expiry = new Date(expiryDate);
  const now = new Date();

  if (isNaN(expiry.getTime())) {
    return 'Invalid Date';
  }

  if (expiry < now) {
    return locale === 'ar' ? 'منتهي الصلاحية' : 'Expired';
  }

  const daysLeft = daysBetween(now, expiry);

  if (daysLeft === 0) {
    return locale === 'ar' ? 'ينتهي اليوم' : 'Expires today';
  }

  if (daysLeft === 1) {
    return locale === 'ar' ? 'ينتهي غدًا' : 'Expires tomorrow';
  }

  if (daysLeft <= 7) {
    return locale === 'ar' ? `ينتهي في ${daysLeft} أيام` : `Expires in ${daysLeft} days`;
  }

  return locale === 'ar'
    ? `ينتهي في ${formatDate(expiry, { locale, short: true })}`
    : `Expires on ${formatDate(expiry, { locale, short: true })}`;
};

export default {
  formatDate,
  formatRelativeTime,
  formatShortDate,
  formatLongDate,
  formatDateTime,
  formatTime,
  formatDateRange,
  formatContextualDate,
  formatExpiryDate,
  formatInputDate,
  isToday,
  isYesterday,
  isThisWeek,
  daysBetween,
  addDays,
  parseDate,
  startOfDay,
  endOfDay,
};
