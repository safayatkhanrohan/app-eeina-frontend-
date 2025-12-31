import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star, Trash2 } from 'lucide-react';
import { formatDateLocalized } from '@/lib/formatTimeLocalized';
import { CommentSkeleton } from '@/components/ui/skeletons/CommentSkeleton';

interface RecipeRate {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    image: { url: string };
    accountStatus: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface RecipeRatingsProps {
  recipe: any;
  recipeRates: RecipeRate[];
  currentUserId?: string;
  myRating?: RecipeRate;
  isLoading: boolean;
  isFetching: boolean;
  hasMore: boolean;
  lastElementRef: (node: HTMLDivElement | null) => void;
  onSubmitRating: (rating: number, comment: string) => Promise<void>;
  onDeleteRating: (rateId: string) => Promise<void>;
  language: string;
  isRTL: boolean;
  t: any;
}

/**
 * RecipeRatings Component
 *
 * Displays recipe ratings/reviews section
 * Allows users to submit, update, or delete their own rating
 * Shows all ratings with infinite scroll
 *
 * @param recipe - Recipe data object
 * @param recipeRates - Array of rating objects
 * @param currentUserId - ID of current logged-in user
 * @param myRating - Current user's existing rating (if any)
 * @param isLoading - Loading state
 * @param isFetching - Fetching state for infinite scroll
 * @param hasMore - Whether more ratings are available
 * @param lastElementRef - Ref for infinite scroll trigger
 * @param onSubmitRating - Callback to submit/update rating
 * @param onDeleteRating - Callback to delete rating
 * @param language - Current language (en/ar)
 * @param isRTL - Whether current language is RTL
 * @param t - Translation function
 */
export const RecipeRatings: React.FC<RecipeRatingsProps> = ({
  recipe,
  recipeRates,
  currentUserId,
  myRating,
  isLoading,
  isFetching,
  hasMore,
  lastElementRef,
  onSubmitRating,
  onDeleteRating,
  language,
  isRTL,
  t,
}) => {
  const [userRating, setUserRating] = useState(myRating?.rating || 0);
  const [ratingComment, setRatingComment] = useState(myRating?.comment || '');
  const navigate = useNavigate();

  /**
   * Handle rating submission
   */
  const handleSubmit = async () => {
    try {
      await onSubmitRating(userRating, ratingComment);
      // Reset form if it was a new rating (not an update)
      if (!myRating) {
        setUserRating(0);
        setRatingComment('');
      }
    } catch (err: any) {
      if (err.status === 401) {
        navigate('/login');
      }
    }
  };

  /**
   * Handle rating deletion
   */
  const handleDelete = async (rateId: string) => {
    if (!rateId) return;
    if (!window.confirm('Are you sure you want to delete this Rate?')) return;

    try {
      await onDeleteRating(rateId);
    } catch (err: any) {
      if (err.status === 401) {
        navigate('/login');
      }
    }
  };

  return (
    <div className="mb-0 sm:mb-8">
      {/* Section Header with Average Rating */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 justify-between mb-0 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{t.recipe.ratings}</h3>
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < recipe?.averageRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-bold">{recipe?.averageRating.toFixed(1)}</span>
          <span className="text-sm sm:text-base md:text-lg text-gray-500 ml-1">
            ({recipe?.ratingCount} {t.recipe.ratings.toLowerCase()})
          </span>
        </div>
      </div>

      {/* Ratings List */}
      <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
        {recipeRates.length > 0 ? (
          <>
            {recipeRates.map((rating) => (
              <div key={rating._id} className="flex gap-3 sm:gap-4">
                {/* User Avatar */}
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                  <Avatar className="w-full h-full">
                    <img
                      src={rating?.user?.image?.url || '/unnamed.jpg'}
                      alt={rating?.user.firstName}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                  {/* Active Status Indicator */}
                  {rating.user.accountStatus === 'active' && (
                    <span
                      className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 ring-2 ring-white animate-pulse z-10`}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Rating Content */}
                <div className="flex-1">
                  {/* User Info and Delete Button */}
                  <div className="flex flex-row sm:items-center justify-between gap-1 sm:gap-3 mb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                      <span className="font-bold text-gray-900 text-sm sm:text-base">
                        {`${rating?.user?.firstName} ${rating?.user?.lastName}`}
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        {formatDateLocalized(rating?.createdAt, language)}
                      </span>
                    </div>
                    {/* Only show delete button for user's own rating */}
                    {currentUserId === rating.user._id && (
                      <Button
                        onClick={() => handleDelete(rating._id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating?.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {rating?.comment}
                  </p>
                </div>
              </div>
            ))}

            {/* Infinite Scroll Trigger */}
            {isLoading && (
              <div ref={lastElementRef} className="p-4 text-center">
                {isFetching && hasMore && [...Array(2)].map((_, i) => <CommentSkeleton key={i} />)}
              </div>
            )}
          </>
        ) : (
          <h2 className="text-center text-gray-500 text-base sm:text-lg font-semibold my-6">
            {language === 'ar'
              ? 'لا توجد تقييمات حتى الآن – كن أول من يشارك رأيه!'
              : 'No reviews yet – be the first to share your feedback!'}
          </h2>
        )}
      </div>

      {/* Add/Update Rating Form */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm">
        <h4 className="font-bold text-gray-900 mb-4">
          {myRating ? t.recipe.updateTitle_rating : t.recipe.add_rating}
        </h4>

        {/* Star Rating Selector */}
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer ${
                star <= userRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => setUserRating(star)}
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">
            {userRating > 0 ? `${userRating}/5` : t.recipe.select_rating}
          </span>
        </div>

        {/* Comment Textarea */}
        <textarea
          placeholder={t.recipe.rating_comment}
          value={ratingComment}
          onChange={(e) => setRatingComment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent text-sm"
          rows={3}
        />

        {/* Submit Button */}
        <Button
          className="bg-primaryColor hover:bg-[#1c9a40] text-white mt-4"
          disabled={userRating === 0 || ratingComment === '' || isLoading}
          onClick={handleSubmit}
        >
          {myRating ? t.recipe.update_rating : t.recipe.submit_rating}
        </Button>
      </div>
    </div>
  );
};
