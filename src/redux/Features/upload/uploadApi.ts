import { baseApi } from '@/redux/API/baseApi';

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: '/upload/image',
        method: 'POST',
        body: formData,
      }),
    }),

    uploadImageFromUrl: builder.mutation({
      query: ({ imageUrl }) => ({
        url: '/upload/image-url',
        method: 'POST',
        body: { imageUrl },
      }),
    }),
  }),
});

export const { useUploadImageMutation, useUploadImageFromUrlMutation } = uploadApi;
