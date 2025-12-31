import { baseApi } from '../../API/baseApi';

const savedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSaved_recipe: builder.query({
      query: ({
        page,
        limit,
        q,
        category,
      }: {
        page?: number;
        limit?: number;
        q?: string;
        category?: string;
      }) => {
        const queryParams = new URLSearchParams();
        if (page) queryParams.append('page', page.toString());
        if (limit) queryParams.append('limit', limit.toString());
        if (q) queryParams.append('q', q);
        if (category) queryParams.append('category', category);

        return {
          url: `/user/saved-recipes?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Saved'],
    }),
    saveRecipe: builder.mutation({
      query: (id) => ({
        url: `recipe/save/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Saved'],
    }),
  }),
});

export const { useGetSaved_recipeQuery, useSaveRecipeMutation } = savedApi;
