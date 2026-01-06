/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from '../../API/baseApi';

const RecipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // recipes endpoints
    getPublicRecipe: builder.query({
      query: ({
        page = 1,
        limit = 4,
        q,
        category,
        category_restrictions,
        food_restrictions,
        difficulty,
        createdBy,
        sort,
        minTime,
        maxTime,
        ingredients,
        minCalories,
        maxCalories,
      }) => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (q) params.append('q', q);
        if (category) params.append('category', category);
        if (category_restrictions) params.append('category_restrictions', category_restrictions);
        if (food_restrictions) params.append('food_restrictions', food_restrictions);
        if (createdBy) params.append('createdBy', createdBy);
        if (difficulty) params.append('difficulty', difficulty);
        if (sort) params.append('sort', sort);
        if (minTime) params.append('minTime', minTime);
        if (maxTime) params.append('maxTime', maxTime);
        if (ingredients) params.append('ingredients', ingredients);
        if (minCalories) params.append('minCalories', minCalories.toString());
        if (maxCalories) params.append('maxCalories', maxCalories.toString());
        console.log('GET request URL:', `/recipe?${params.toString()}`);

        return {
          url: `/recipe?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Recipe'],
    }),
    getUserRecipe: builder.query({
      query: ({ page = 1, limit = 4, q, status }) => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (q) params.append('q', q);
        if (status) params.append('status', status);
        return {
          url: `/recipe/user?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Recipe'],
    }),
    getSinglePublicRecipe: builder.query({
      query: (slug: string) => ({
        url: `/recipe/${slug}`,
        method: 'GET',
      }),
      providesTags: ['RecipeDetails'],
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `/upload/image`,
        method: 'POST',
        body: formData,
        credentials: 'include',
      }),
    }),
    createRecipe: builder.mutation({
      query: (recipeData) => ({
        url: `/recipe/create`,
        method: 'POST',
        body: recipeData,
        credentials: 'include',
      }),
      invalidatesTags: ['Recipe'],
    }),
    editRecipe: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/recipe/edit/${id}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
    }),
    likeRecipe: builder.mutation({
      query: (id) => ({
        url: `recipe/like/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Recipe'],
    }),
    getRecipeById: builder.query({
      query: (id: string) => ({
        url: `/recipe/id/${id}`,
        method: 'GET',
      }),
      providesTags: ['RecipeDetails'],
    }),
    ImportRecipe: builder.mutation({
      query: (recipeData) => ({
        url: `/recipe/user/import`,
        method: 'POST',
        body: recipeData,
        credentials: 'include',
      }),
      invalidatesTags: ['Recipe'],
    }),
    ImportRecipeWithAI: builder.mutation({
      query: (recipeData) => ({
        url: `/recipe/user/import/v2`,
        method: 'POST',
        body: recipeData,
        credentials: 'include',
      }),
      invalidatesTags: ['Recipe'],
    }),
    getTrendingRecipe: builder.query({
      query: ({ page = 1, limit = 4, q }: { page?: number; limit?: number; q?: string }) => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (q) params.append('q', q);
        return {
          url: `/recipe/trending?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Recipe'],
    }),
  }),
});

export const {
  useGetPublicRecipeQuery,
  useGetSinglePublicRecipeQuery,
  useUploadImageMutation,
  useCreateRecipeMutation,
  useLikeRecipeMutation,
  useGetRecipeByIdQuery,
  useEditRecipeMutation,
  useImportRecipeMutation,
  useGetTrendingRecipeQuery,

  useGetUserRecipeQuery,
  useImportRecipeWithAIMutation,
  useLazyGetRecipeByIdQuery,
  useLazyGetSinglePublicRecipeQuery,
} = RecipeApi;
