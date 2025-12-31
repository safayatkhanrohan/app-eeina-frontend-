import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Share2, Edit, Bookmark, Printer, CalendarPlus } from 'lucide-react';
import { getLocalizedPath } from '@/lib/getLocalizedPath';
import { Recipe } from '@/types/recipeDetails.type';

interface RecipeHeaderProps {
  recipe: Recipe;
  language: string;
  t: any;
  onShare: () => void;
  onEdit: () => void;
  onToggleSave: (e: React.MouseEvent, recipeId: string) => void;
  onPrint: () => void;
  onAddToPlan: () => void;
  isSaved: boolean;
}

/**
 * RecipeHeader Component
 *
 * Displays recipe title, author, category, and action buttons
 * Includes share, edit, save, and print functionality
 *
 * @param recipe - Recipe data object
 * @param language - Current language (en/ar)
 * @param t - Translation function
 * @param onShare - Callback for share button
 * @param onEdit - Callback for edit button
 * @param onToggleSave - Callback for save/bookmark button
 * @param onPrint - Callback for print button
 * @param isSaved - Whether recipe is saved by current user
 */
export const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  recipe,
  language,
  t,
  onShare,
  onEdit,
  onToggleSave,
  onPrint,
  onAddToPlan,
  isSaved,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
      <div className="flex-1">
        {/* Category and Author Section */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Category Badge */}
          {recipe?.dish?.[0]?.name && (
            <Badge className="bg-gradient-to-r from-primaryColor to-[#1c9a40] text-white px-3 py-1.5 text-sm font-medium shadow-sm">
              {recipe.dish[0].name[language as 'en' | 'ar']}
            </Badge>
          )}

          {/* Author Info */}
          <div className="flex items-center gap-2">
            <Link
              to={getLocalizedPath(`/user/${recipe?.createdBy?._id}`, language)}
              className="flex items-center gap-2 group"
            >
              <Avatar className="w-8 h-8 ring-2 ring-gray-200 group-hover:ring-primaryColor transition-all">
                <img
                  src={recipe?.createdBy?.image?.url || '/unnamed.jpg'}
                  alt={recipe?.createdBy?.firstName}
                  className="object-cover"
                />
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-900 group-hover:text-primaryColor transition-colors">
                  {recipe?.createdBy?.firstName} {recipe?.createdBy?.lastName}
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recipe Title */}
        <h1 className="text-base sm:text-2xl 2xl:text-4xl font-bold text-gray-900 mb-2 leading-tight">
          {recipe?.title[language as 'en' | 'ar']}
        </h1>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {/* Add to Plan Button */}
          <Button
            variant="default"
            size="sm"
            onClick={onAddToPlan}
            className="rounded-full bg-[#1c9a40] hover:bg-[#157a32] text-white transition-colors border-none"
          >
            <CalendarPlus className="w-4 h-4 mr-2" />
            {t.recipe?.addToPlan || (language === 'ar' ? 'إضافة للخطة' : 'Add to Plan')}
          </Button>

          {/* Edit Button */}
          <Button
            onClick={onEdit}
            variant="outline"
            size="sm"
            className="rounded-full border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            <Edit className="w-4 h-4 mr-2" />
            {t.recipe.edit || (language === 'ar' ? 'تعديل' : 'Edit')}
          </Button>

          {/* Save/Bookmark Button */}
          <Button
            variant="outline"
            size="sm"
            className={`rounded-full border-gray-300 hover:border-[#cfcfcf] transition-colors ${isSaved ? 'text-yellow-500' : 'text-gray-600 hover:text-yellow-500'
              }`}
            onClick={(e) => onToggleSave(e, recipe._id)}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            {t.common.save}
          </Button>

          {/* Print Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onPrint}
            className="rounded-full border-gray-300 hover:border-[#cfcfcf] transition-colors"
          >
            <Printer className="w-7 h-7" />
          </Button>

          {/* Share Button */}
          <Button
            onClick={onShare}
            variant="outline"
            size="sm"
            className="rounded-full border-gray-300 hover:border-[#1c9a40] hover:text-[#1c9a40] transition-colors"
          >
            <Share2 className="w-4 h-4 mr-2" />
            {t.recipe.share || (language === 'ar' ? 'مشاركة' : 'Share')}
          </Button>
        </div>
      </div>
    </div>
  );
};
