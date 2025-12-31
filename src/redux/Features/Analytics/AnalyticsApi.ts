import { baseApi } from '../../API/baseApi';

// Types
export interface DashboardOverview {
  today: {
    pageViews: number;
    sessions: number;
    uniqueVisitors: number;
    avgSessionDuration: number;
    bounceRate: number;
  };
  trends: {
    pageViews: number;
    sessions: number;
    uniqueVisitors: number;
  };
  last7Days: Array<{
    date: string;
    pageViews: number;
    sessions: number;
    uniqueVisitors: number;
  }>;
}

export interface RecipeStats {
  totalViews: number;
  totalLikes: number;
  totalSaves: number;
  totalShares: number;
  topRecipes: Array<{
    recipeId: string;
    views: number;
    likes: number;
    saves: number;
    shares: number;
  }>;
}

export interface DailyStat {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  sessions: number;
  avgSessionDuration: number;
  bounceRate: number;
  eventTypeCounts: Record<string, number>;
  topRecipes: Array<{
    recipeId: string;
    views: number;
    likes: number;
    saves: number;
    shares: number;
  }>;
  topSearches: Array<{
    term: string;
    count: number;
  }>;
  topCategories: Array<{
    categoryId: string;
    views: number;
  }>;
  deviceBreakdown: Record<string, number>;
}

export interface AnalyticsEvent {
  _id: string;
  sessionId: string;
  userId?: string;
  type: string;
  payload: Record<string, unknown>;
  timestamp: string;
  url: string;
  referrer?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
}

export interface AnalyticsSession {
  _id: string;
  sessionId: string;
  userId?: string;
  startedAt: string;
  endedAt?: string;
  lastActivityAt: string;
  pageViews: number;
  eventsCount: number;
  referrer?: string;
  landingPage?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
}

export interface TopContent {
  topRecipes: Array<{
    recipeId: string;
    views: number;
    likes: number;
    saves: number;
    shares: number;
  }>;
  topSearches: Array<{
    term: string;
    count: number;
  }>;
  topCategories: Array<{
    categoryId: string;
    views: number;
  }>;
}

// Query params interfaces
interface DateRangeParams {
  startDate?: string;
  endDate?: string;
}

interface PaginationParams {
  page?: number;
  limit?: number;
}

interface EventsQueryParams extends DateRangeParams, PaginationParams {
  type?: string;
  userId?: string;
  sessionId?: string;
}

interface SessionsQueryParams extends DateRangeParams, PaginationParams {
  userId?: string;
}

// API
const AnalyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard overview
    getDashboardOverview: builder.query<{ success: boolean; data: DashboardOverview }, void>({
      query: () => ({
        url: '/analytics/admin/dashboard',
        method: 'GET',
      }),
    }),

    // Get events with filtering
    getEvents: builder.query<
      {
        success: boolean;
        data: {
          events: AnalyticsEvent[];
          pagination: { total: number; page: number; limit: number; pages: number };
        };
      },
      EventsQueryParams
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.startDate) searchParams.append('startDate', params.startDate);
        if (params.endDate) searchParams.append('endDate', params.endDate);
        if (params.type) searchParams.append('type', params.type);
        if (params.userId) searchParams.append('userId', params.userId);
        if (params.sessionId) searchParams.append('sessionId', params.sessionId);
        if (params.page) searchParams.append('page', params.page.toString());
        if (params.limit) searchParams.append('limit', params.limit.toString());

        return {
          url: `/analytics/admin/events?${searchParams.toString()}`,
          method: 'GET',
        };
      },
    }),

    // Get sessions with filtering
    getSessions: builder.query<
      {
        success: boolean;
        data: {
          sessions: AnalyticsSession[];
          pagination: { total: number; page: number; limit: number; pages: number };
        };
      },
      SessionsQueryParams
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.startDate) searchParams.append('startDate', params.startDate);
        if (params.endDate) searchParams.append('endDate', params.endDate);
        if (params.userId) searchParams.append('userId', params.userId);
        if (params.page) searchParams.append('page', params.page.toString());
        if (params.limit) searchParams.append('limit', params.limit.toString());

        return {
          url: `/analytics/admin/sessions?${searchParams.toString()}`,
          method: 'GET',
        };
      },
    }),

    // Get recipe stats
    getRecipeStats: builder.query<
      { success: boolean; data: RecipeStats },
      { recipeId?: string } & DateRangeParams
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.recipeId) searchParams.append('recipeId', params.recipeId);
        if (params.startDate) searchParams.append('startDate', params.startDate);
        if (params.endDate) searchParams.append('endDate', params.endDate);

        return {
          url: `/analytics/admin/recipes?${searchParams.toString()}`,
          method: 'GET',
        };
      },
    }),

    // Get daily stats
    getDailyStats: builder.query<{ success: boolean; data: DailyStat[] }, DateRangeParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.startDate) searchParams.append('startDate', params.startDate);
        if (params.endDate) searchParams.append('endDate', params.endDate);

        return {
          url: `/analytics/admin/daily?${searchParams.toString()}`,
          method: 'GET',
        };
      },
    }),

    // Get top content
    getTopContent: builder.query<
      { success: boolean; data: TopContent },
      DateRangeParams & { limit?: number }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.startDate) searchParams.append('startDate', params.startDate);
        if (params.endDate) searchParams.append('endDate', params.endDate);
        if (params.limit) searchParams.append('limit', params.limit.toString());

        return {
          url: `/analytics/admin/top-content?${searchParams.toString()}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetEventsQuery,
  useGetSessionsQuery,
  useGetRecipeStatsQuery,
  useGetDailyStatsQuery,
  useGetTopContentQuery,
} = AnalyticsApi;

export default AnalyticsApi;
