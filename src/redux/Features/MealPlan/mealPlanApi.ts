import { baseApi } from '../../API/baseApi';

const MealPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDefaultMeals: builder.query<any, void>({
      query: () => ({
        url: 'meal',
        method: 'GET',
      }),
      providesTags: ['Meal'],
    }),
    getUserMeals: builder.query({
      query: ({ startDate, endDate }) => {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        return {
          url: `meal/user?${params.toString()}`,
          method: 'get',
        };
      },
      providesTags: ['Meal'],
    }),
    createCustomMeal: builder.mutation({
      query: (data) => ({
        url: 'meal/custom',
        method: 'post',
        body: data,
      }),
      invalidatesTags: ['Meal'],
    }),

    getMealPlans: builder.query<any, { startDate?: string; endDate?: string }>({
      query: ({ startDate, endDate }) => {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        return {
          url: `meal-planner?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['MealPlan'],
    }),

    updateMealPlan: builder.mutation({
      query: (data) => ({
        url: `meal-planner`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['MealPlan'],
    }),

    getAllMealPlannerTemplates: builder.query({
      query: ({ page, limit, q, goalId, fuzzy }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', page.toString());
        if (limit) params.append('limit', limit.toString());
        if (q) params.append('q', q);
        if (goalId) params.append('goalId', goalId);
        if (fuzzy !== undefined) params.append('fuzzy', fuzzy.toString());

        return {
          url: `meal-planner-templates?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['MealPlannerTemplate'],
    }),

    getMealPlannerTemplateById: builder.query({
      query: (id) => ({
        url: `meal-planner-templates/${id}`,
        method: 'GET',
      }),
      providesTags: ['MealPlannerTemplate'],
    }),

    importMealPlanFromTemplate: builder.mutation({
      query: (data) => ({
        url: `meal-planner/import`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['MealPlan'],
    }),

    addItemToMealPlan: builder.mutation({
      query: (data) => ({
        url: `meal-planner/add-item`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['MealPlan'],
    }),
  }),
});

export const {
  useGetDefaultMealsQuery,
  useGetUserMealsQuery,
  useCreateCustomMealMutation,
  useGetMealPlansQuery,
  useUpdateMealPlanMutation,
  useGetAllMealPlannerTemplatesQuery,
  useGetMealPlannerTemplateByIdQuery,
  useImportMealPlanFromTemplateMutation,
  useAddItemToMealPlanMutation,
} = MealPlanApi;
