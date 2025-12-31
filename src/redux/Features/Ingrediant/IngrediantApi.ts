import { baseApi } from '../../API/baseApi';

const IngrediantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllIngredient: builder.query({
      query: ({ page, limit, q, isFeatured }) => {
        const queryParams = new URLSearchParams();
        if (page) queryParams.append('page', page);
        if (limit) queryParams.append('limit', limit);
        if (q) queryParams.append('q', q);
        if (isFeatured !== undefined) queryParams.append('isFeatured', isFeatured);
        const queryString = queryParams.toString();
        return {
          url: `/ingredient?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: ['Ingrediant'],
    }),
    getFruits: builder.query({
      query: ({ page, limit, q }) => {
        const queryParams = new URLSearchParams();
        if (page) queryParams.append('page', page);
        if (limit) queryParams.append('limit', limit);
        if (q) queryParams.append('q', q);
        queryParams.append('category', 'Fruits');
        const queryString = queryParams.toString();
        return {
          url: `/ingredient?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: ['Ingrediant'],
    }),
    GetIngrediantBySlug: builder.query({
      query: (slug: string) => ({
        url: `ingredient/${slug}`,
        method: 'get',
      }),
      providesTags: ['Ingrediant'],
    }),
  }),
});

export const { useGetIngrediantBySlugQuery, useGetAllIngredientQuery, useGetFruitsQuery } =
  IngrediantApi;
