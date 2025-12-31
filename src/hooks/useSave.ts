import { useEffect, useRef } from 'react';
import { useSaveRecipeMutation } from '../redux/Features/Saved/savedApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSave, toggleSave } from '../redux/Features/Saved/SaveSlice';
import { analytics } from '../utils/analytics';
import { trackIfAllowed } from '@/utils/analyticsHelper';

type Recipe = {
  _id: string;
  savedBy?: string[];
};
export const useSave = (recipeOrRecipes: Recipe | Recipe[] | null, userId?: string) => {
  const Save = useSelector((state: any) => state.Save) || {};
  const dispatch = useDispatch();
  const [saveRecipe] = useSaveRecipeMutation();
  const navigate = useNavigate();
  const initialized = useRef(false);
  const prevRecipeIds = useRef<string>('');

  useEffect(() => {
    if (!userId || !recipeOrRecipes) return;

    // Generate a unique key for the current input to prevent infinite loops
    let currentIds = '';
    if (Array.isArray(recipeOrRecipes)) {
      currentIds = recipeOrRecipes.map((r) => r?._id).join(',');
    } else {
      currentIds = recipeOrRecipes?._id || '';
    }

    // If we've already processed these exact recipes, don't dispatch again
    if (prevRecipeIds.current === currentIds) {
      return;
    }

    const initialSave: Record<string, boolean> = {};
    if (Array.isArray(recipeOrRecipes)) {
      recipeOrRecipes.forEach((recipe) => {
        if (recipe?._id) {
          initialSave[recipe._id] = recipe?.savedBy?.includes(userId) ?? false;
        }
      });
    } else {
      const recipe = recipeOrRecipes;
      if (recipe?._id) {
        initialSave[recipe._id] = recipe?.savedBy?.includes(userId) ?? false;
      }
    }

    dispatch(setSave(initialSave));
    prevRecipeIds.current = currentIds;
    initialized.current = true;
  }, [userId, recipeOrRecipes, dispatch]);

  const handleToggleSave = async (e: React.MouseEvent, recipeId: string) => {
    e.preventDefault();
    const newValu = !Save[recipeId];
    dispatch(toggleSave({ recipeId, saved: newValu }));

    // Track save/unsave event
     trackIfAllowed(() =>
    analytics.trackRecipeSave(recipeId, newValu));

    console.log('recipeId', recipeId);
    try {
      const res = await saveRecipe(recipeId).unwrap();

      if (!res.success) {
        dispatch(toggleSave({ recipeId, saved: !newValu }));
      }
    } catch (err: any) {
      if (err?.status === 401) {
        navigate('/login');
      }
      dispatch(toggleSave({ recipeId, saved: !newValu }));
      console.error('Error toggling save:', err);
    }
  };

  return { Save, handleToggleSave };
};
