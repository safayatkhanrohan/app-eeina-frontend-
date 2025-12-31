import { useDispatch, useSelector } from 'react-redux';
import { useLikeRecipeMutation } from '../redux/Features/Recipe/RecipeApi';
import { useEffect, useRef } from 'react';
import { setLikes, toggleLike } from '../redux/Features/User/LikeSlice';
import { useNavigate } from 'react-router-dom';
import { analytics } from '../utils/analytics';
import { trackIfAllowed } from '@/utils/analyticsHelper';

export const useLikes = (recipes: any[], userId?: string) => {
  const likes = useSelector((state: any) => state.likes) || {};
  const dispatch = useDispatch();
  const [likeRecipe] = useLikeRecipeMutation();
  const navigate = useNavigate();
  const initialized = useRef(false);
  const prevRecipeIds = useRef<string>('');

  useEffect(() => {
    if (recipes?.length > 0 && userId) {
      // Create a unique key for the current recipes to avoid unnecessary updates
      const currentRecipeIds = recipes.map((r) => r._id).join(',');

      // If we've already processed these exact recipes, don't dispatch again
      if (prevRecipeIds.current === currentRecipeIds) {
        return;
      }

      const initialLikes: Record<string, boolean> = {};
      recipes.forEach((recipe) => {
        if (recipe?._id) {
          initialLikes[recipe._id] =
            recipe.likedBy?.some((like: any) => like.user === userId) ?? false;
        }
      });
      // console.log('useEffect running, recipes:', recipes?.length, 'userId:', userId);

      dispatch(setLikes(initialLikes));
      prevRecipeIds.current = currentRecipeIds;
      initialized.current = true;
    }
  }, [userId, dispatch, recipes]);

  const handleToggleLike = async (e: React.MouseEvent, recipeId: string) => {
    e.preventDefault();

    const newValue = !likes[recipeId];
    dispatch(toggleLike({ recipeId, liked: newValue }));

    // Track like/unlike event
    trackIfAllowed(() => analytics.trackRecipeLike(recipeId, newValue));

    try {
      const res = await likeRecipe(recipeId).unwrap();
      if (!res.success) {
        dispatch(toggleLike({ recipeId, liked: !newValue }));
      }
      console.log('res like', res);
    } catch (err: any) {
      console.log('error', err);
      dispatch(toggleLike({ recipeId, liked: !newValue }));
    }
  };
  // console.log("likes state:", likes);

  return { likes, handleToggleLike };
};
