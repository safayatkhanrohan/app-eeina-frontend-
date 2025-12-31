import { baseApi } from '../../API/baseApi';

const fruitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFruits: builder.query({
      query: ({ page = 1, limit = 10, q, category }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', page.toString());
        if (limit) params.append('limit', limit.toString());
        if (q) params.append('q', q);
        if (category) params.append('category', category);
        return {
          url: `/fruit?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Fruit'],
    }),

    getFruitBySlug: builder.query({
      query: (slug) => ({
        url: `/fruit/${slug}`,
        method: 'GET',
      }),
      providesTags: ['Fruit'],
    }),
  }),
});

export const { useGetFruitsQuery, useGetFruitBySlugQuery } = fruitApi;
