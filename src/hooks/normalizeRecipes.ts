import { useMemo } from "react";

export const useNormalizedRecipes = (recipes: any[]) => {
  return useMemo(() => {
    return (recipes || []).map((r) => ({
      _id: r._id,
    title: {
      en: r.title?.en || '',
      ar: r.title?.ar || '',
    },
    slug: {
      en: r.slug?.en || '',
      ar: r.slug?.ar || '',
    },
    image: r.thumbnail?.url || '',
    category: Array.isArray(r.category) ? r.category: '',
    cuisine: Array.isArray(r.cuisine) ? r.cuisine.map(c => c.en).join(', ') : r.cuisine || '',
    time: r.time,
    servings: r.servings,
    difficulty: r.difficulty,
    createdAt: r.updatedAt,
    author: {
      name: `${r.createdBy?.firstName || ''} ${r.createdBy?.lastName || ''}`,
      avatar: '/unnamed.jpg'
    },
    reviews: r.comments?.length || 0,
    likedBy: r.likedBy || [],
    likesCount: r.likesCount || 0,
    createdBy:r.createdBy,
    viewCount:r.viewCount,
    savedBy:r.savedBy,
    averageRating:r.averageRating,
    ratingCount:r.ratingCount,
    dish:r.dish,

    }));
  }, [recipes]);
};
