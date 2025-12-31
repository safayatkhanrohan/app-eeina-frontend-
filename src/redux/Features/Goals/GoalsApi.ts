import { baseApi } from '../../API/baseApi';

const GoalsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGoals: builder.query({
      query: ({ status }) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        return {
          url: `/goals?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Goal'],
    }),

    createGoal: builder.mutation({
      query: (Data) => ({
        url: `/goals`,
        method: 'POST',
        body: Data,
      }),
      invalidatesTags: ['Goal'],
    }),

    getGeneratedmealPlans: builder.query({
      query: ({ date, goalId }) => {
        const params = new URLSearchParams();
        params.append('date', date);
        params.append('goalId', goalId);
        return {
          url: `/goals/meal-plans/?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['GeneratedPlan'],
    }),

    getAllGeneratedmealPlans: builder.query({
      query: () => ({
        url: `/goals/generated-meal-plans`,
        method: 'GET',
      }),
      providesTags: ['GeneratedPlan'],
    }),

    updateGoal: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/goals/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Goal'],
    }),
    updateprogress: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/goals/${id}/progress`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Goal'],
    }),
    updateStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/goals/${id}/status`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Goal'],
    }),

    importGeneratedPlan: builder.mutation({
      query: ({ id, ...Data }) => ({
        url: `/goals/import-plan`,
        method: 'POST',
        body: Data,
      }),

      invalidatesTags: ['Goal'],
    }),

    getgoalsstatistics: builder.query({
      query: ({ category, startDate, endDate }) => {
        const params = new URLSearchParams();

        if (category) params.append('category', category);
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        return {
          url: `/goals/statistics?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Goal'],
    }),

    updateGeneratedPlan: builder.mutation({
      query: (data) => ({
        url: `/goals/meal-plans`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['GeneratedPlan'],
    }),

    updateMealProgress: builder.mutation({
      query: ({ goalId, ...data }) => ({
        url: `/goals/${goalId}/progress/meal-log`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Goal'],
    }),

    updateWeightProgress: builder.mutation({
      query: ({ goalId, ...data }) => ({
        url: `/goals/${goalId}/progress/weight`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Goal'],
    }),
  }),
});

export const {
  useGetGoalsQuery,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useUpdateStatusMutation,
  useUpdateprogressMutation,
  useGetgoalsstatisticsQuery,
  useGetGeneratedmealPlansQuery,
  useImportGeneratedPlanMutation,
  useUpdateGeneratedPlanMutation,
  useUpdateMealProgressMutation,
  useUpdateWeightProgressMutation,
  useGetAllGeneratedmealPlansQuery,
} = GoalsApi;
