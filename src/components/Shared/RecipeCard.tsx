import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Heart, Share2, Bookmark, Calendar, ListPlus, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatTimeLocalized } from '../../lib/formatTimeLocalized';
import ShareModal from '../ShareModal/ShareModal';
import { getLocalizedPath } from '../../lib/getLocalizedPath';
import { useAppSelector } from '../../hooks/hook';

type RecipeCardProps = {
  recipe: any;
  likes?: Record<string, boolean>;
  saves?: Record<string, boolean>;
  handleToggleLike: (e: React.MouseEvent, recipeId: string) => void;
  handleToggleSave: (e: React.MouseEvent, recipeId: string) => void;
};

export const RecipeCard = ({
  recipe,
  likes,
  saves,
  handleToggleLike,
  handleToggleSave,
}: RecipeCardProps): JSX.Element => {
  const { isRTL, language } = useLanguage();
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [openDropdown, setopenDropdown] = useState(false);

  const fallbackLanguage = language === 'en' ? 'ar' : 'en';
  const shareUrl =
    window.location.origin +
    getLocalizedPath(
      `/recipe/${recipe?.slug?.[language] || recipe?.slug?.[fallbackLanguage]}`,
      language,
    );
  let creatorId = '';
  let creatorName = '';
  if (recipe?.createdBy) {
    if (typeof recipe.createdBy === 'string') {
      creatorId = recipe.createdBy;
      creatorName = `${user?.firstName} ${user?.lastName}`;
    } else {
      creatorId = recipe?.createdBy?._id;
      creatorName = `${recipe?.createdBy?.firstName} ${recipe?.createdBy?.lastName}`;
    }
  }
  return (
    <Card className="bg-white rounded-2xl sm:rounded-3xl border-0 shadow-sm h-full">
      <CardContent className="p-3 sm:p-6 flex flex-col h-full">
        {/* Post Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <Avatar className="w-8 h-8 sm:w-12 sm:h-12">
            <Link to={getLocalizedPath(`/user/${creatorId}`, language)}>
              <img
                src={user?.image?.url || '/unnamed.jpg'}
                alt= {creatorName||"Adam Ahmed"}
                className="w-full h-full object-cover"
              />
            </Link>
          </Avatar>
          <div className="flex-1 min-w-0">
            <Link
              to={getLocalizedPath(`/user/${creatorId}`, language)}
              className="font-semibold text-sm sm:text-base text-black hover:text-primaryColor transition-colors block truncate"
            >
              {creatorName}
            </Link>
            <div className="text-xs sm:text-sm text-[#7a7a7a]">
              {formatTimeLocalized(recipe?.time)}
            </div>
          </div>
          <div className="relative">
            <Button
              onClick={() => setopenDropdown(!openDropdown)}
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 text-gray-400 hover:text-gray-600"
            >
              <div className="flex items-center gap-0.5">
                <div className="w-1 h-1 bg-current rounded-full" />
                <div className="w-1 h-1 bg-current rounded-full" />
                <div className="w-1 h-1 bg-current rounded-full" />
              </div>
            </Button>
            {openDropdown && (
              <div className="absolute right-0 mt-1 z-10 w-48 bg-white rounded-lg shadow-lg border py-1">
                <button className="flex items-center w-full px-3 py-2 text-sm hover:text-green-600">
                  <Calendar className="w-4 h-4 mr-2" /> Add Meal Plan
                </button>
                <Link
                  to="/lists"
                  className="flex items-center w-full px-3 py-2 text-sm hover:text-green-600"
                >
                  <ListPlus className="w-4 h-4 mr-2" /> Shopping List
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-3 sm:mb-4">
          <p className="font-semibold text-black text-sm sm:text-lg mb-2 sm:mb-4">
            {recipe?.title?.[language] || recipe?.title?.[fallbackLanguage]}
          </p>
          <Link
            to={getLocalizedPath(
              `/recipe/${recipe?.slug?.[language] || recipe?.slug?.[fallbackLanguage]}`,
              language,
            )}
            className="block rounded-xl sm:rounded-2xl overflow-hidden hover:scale-[1.01] sm:hover:scale-[1.02] transition-transform relative"
          >
            <img
              className="w-full h-48 sm:h-60 object-cover"
              alt={recipe?.title?.[language] || recipe?.title?.[fallbackLanguage]}
              src={recipe?.thumbnail?.url}
            />

            {/* Mobile: Action Buttons Overlay */}
            <div className="sm:hidden absolute inset-0 flex flex-col justify-between p-3">
              {/* Top Right Actions - Save Button */}
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 hover:bg-black/10 ${
                    saves?.[recipe?._id] ? 'text-yellow-500' : 'text-black'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleSave(e, recipe?._id);
                  }}
                >
                  <Bookmark className={`w-4 h-4 ${saves?.[recipe?._id] ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Bottom Left Actions - Like with Count and Share Icon */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-2 text-xs hover:bg-black/10 ${
                    likes?.[recipe?._id] ? 'text-red-500' : 'text-black'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleLike(e, recipe?._id);
                  }}
                >
                  <Heart
                    className={`w-3 h-3 mr-1 ${likes?.[recipe?._id] ? 'fill-red-500 text-red-500' : ''}`}
                  />
                  <span>{recipe?.likesCount}</span>
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-black/10 text-black"
                >
                  <Share2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop: Interactive Actions (Old Design) */}
        <div className="hidden sm:flex items-center gap-4 sm:gap-6">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-2 ${
              likes?.[recipe?._id] ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
            onClick={(e) => handleToggleLike(e, recipe?._id)}
          >
            <Heart
              className={`w-5 h-5 ${likes?.[recipe?._id] ? 'fill-red-500 text-red-500' : ''}`}
            />
            <span>{recipe?.likesCount}</span>
          </Button>
          <Button
            onClick={() => setOpen(true)}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-gray-600 hover:text-green-500"
          >
            <Share2 className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`ml-auto ${
              saves?.[recipe?._id] ? 'text-yellow-500' : 'text-gray-600 hover:text-yellow-500'
            }`}
            onClick={(e) => handleToggleSave(e, recipe?._id)}
          >
            <Bookmark className={`w-5 h-5 ${saves?.[recipe?._id] ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardContent>

      {/* Share Modal */}
      <ShareModal
        open={open}
        onOpenChange={setOpen}
        shareUrl={shareUrl}
        title={language === 'ar' ? 'مشاركة الوصفة' : 'Share Recipe'}
      />
    </Card>
  );
};
