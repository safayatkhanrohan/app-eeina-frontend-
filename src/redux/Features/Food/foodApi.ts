import { baseApi } from '../../API/baseApi';

const foodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFood: builder.query({
      query: ({ page = 1, limit = 10, q, category }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', page.toString());
        if (limit) params.append('limit', limit.toString());
        if (q) params.append('q', q);
        if (category) params.append('category', category);
        return {
          url: `/food?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Food'],
    }),
    getFoodBySlug: builder.query({
      query: (slug) => ({
        url: `/food/${slug}`,
        method: 'GET',
      }),
      providesTags: ['Food'],
    }),
  }),
});

export const { useGetFoodQuery, useGetFoodBySlugQuery } = foodApi;
