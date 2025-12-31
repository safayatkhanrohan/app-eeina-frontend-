import { baseApi } from '../../API/baseApi';

const CategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ page, limit, isFeatured, type }) => {
        const queryParams = new URLSearchParams();
        if (page) queryParams.append('page', page);
        if (limit) queryParams.append('limit', limit);
        if (isFeatured !== undefined) queryParams.append('isFeatured', isFeatured);
        if (type) queryParams.append('type', type);
        const queryString = queryParams.toString();
        return {
          url: `/category?${queryString}`,
          method: 'GET',
        };
      },
      providesTags: ['Category'],
    }),
    GetCategoryBySlug: builder.query({
      query: (slug: string) => ({
        url: `Category/${slug}`,
        method: 'get',
      }),
      providesTags: ['Category'],
    }),
    getTrendingCategories: builder.query<any, void>({
      query: () => ({
        url: '/category/trending',
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryBySlugQuery, useGetTrendingCategoriesQuery } =
  CategoryApi;
