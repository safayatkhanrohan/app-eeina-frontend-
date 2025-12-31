import { baseApi } from '../../API/baseApi';

const RecipeRateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecipeRate: builder.query({
      query: ({ page = 1, limit = 4, recipeId }) => {
        const params = new URLSearchParams();

        params.append('recipeId', recipeId.toString());
        params.append('page', page.toString());
        params.append('limit', limit.toString());

        return {
          url: `/rating?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['RecipeRate'],
    }),
    createRecipeRate: builder.mutation({
      query: (Data) => ({
        url: `/rating`,
        method: 'POST',
        body: Data,
      }),
      invalidatesTags: ['RecipeRate', 'RecipeDetails'],
    }),
    UpdateRecipeRate: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/rating/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['RecipeRate'],
    }),
    deletRecipeRate: builder.mutation({
      query: (id) => ({
        url: `/rating/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['RecipeRate'],
    }),
  }),
});
export const {
  useGetRecipeRateQuery,
  useCreateRecipeRateMutation,
  useUpdateRecipeRateMutation,
  useDeletRecipeRateMutation,
} = RecipeRateApi;
