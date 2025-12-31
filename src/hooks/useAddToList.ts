import { useAddItemMutation } from '@/redux/Features/Shopping List/ShoppingListApi';
import { toast } from 'sonner';
import { getTranslation } from '@/i18n';

export const useAddToList = () => {
  const [addItemToList] = useAddItemMutation();
  const handleAddToList = async ({
    itemType,
    items,
    recipeId,
    language,
  }: {
    itemType: string;
    items: any[];
    recipeId?: string;
    language: string;
  }) => {
    const t = getTranslation(language as 'en' | 'ar');

    if (itemType === 'Ingredient' && (!items || items.length === 0)) {
      toast.error(t.common.error_no_ingredients);
      return;
    }
    try {
      const body = {
        items: items.map((item) => ({
          itemType,
          item: item.item || item._id,
          quantity: item.quantity,
          unit: item.unit,
          recipe: recipeId,
        })),
      };

      await addItemToList(body).unwrap();
      toast.success(t.common.success_added);
    } catch (error: any) {
      console.error(error?.data);
      toast.error(error?.data?.message || t.common.error_failed_add);
    }
  };

  return { handleAddToList };
};
