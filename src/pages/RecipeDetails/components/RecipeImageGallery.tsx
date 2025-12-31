import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Interface for recipe image/video items
 */
interface RecipeMedia {
  type: 'image' | 'video';
  url: string;
  platform?: 'youtube' | 'tiktok';
}

interface RecipeImageGalleryProps {
  recipeImages: RecipeMedia[];
  recipeName: string;
  getVideoId: (url: string) => { platform: string; id: string } | null;
}

/**
 * RecipeImageGallery Component
 *
 * Displays a main image/video carousel with thumbnails
 * Supports YouTube and TikTok video embeds
 *
 * @param recipeImages - Array of images and videos to display
 * @param recipeName - Name of the recipe for alt text
 * @param getVideoId - Function to extract video ID from URL
 */
export const RecipeImageGallery: React.FC<RecipeImageGalleryProps> = ({
  recipeImages,
  recipeName,
  getVideoId,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * Navigate to previous image/video
   */
  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? recipeImages.length - 1 : prev - 1));
  };

  /**
   * Navigate to next image/video
   */
  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === recipeImages.length - 1 ? 0 : prev + 1));
  };

  const currentMedia = recipeImages[currentImageIndex];

  return (
    <div className="relative h-[400px] py-2 sm:p-4">
      {/* Main Image/Video Display */}
      <div className="relative h-[320px] sm:h-[420px] lg:h-[400px] 2xl:h-[500px] rounded-2xl overflow-hidden bg-gray-300 shadow-lg mb-4">
        {currentMedia.type === 'video' ? (
          currentMedia.platform === 'youtube' ? (
            <iframe
              src={currentMedia.url}
              title="Recipe YouTube Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="tiktok-embed-container w-full h-full">
              <iframe
                src={currentMedia.url}
                title="Recipe TikTok Video"
                className="w-full h-full"
                allow="encrypted-media"
                scrolling="no"
              />
            </div>
          )
        ) : (
          <img src={currentMedia.url} alt={recipeName} className=" w-full   h-full  object-cover" />
        )}

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-8 h-8 sm:w-12 sm:h-12 shadow-md"
          onClick={handlePrevious}
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-8 h-8 sm:w-12 sm:h-12 shadow-md"
          onClick={handleNext}
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
        </Button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex justify-center">
        <div className="flex gap-2 sm:gap-3 bg-white rounded-2xl p-2 sm:p-3 shadow-lg">
          {recipeImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all relative ${
                currentImageIndex === index
                  ? 'border-primaryColor scale-110'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={
                  image.type === 'video'
                    ? image.platform === 'youtube'
                      ? `https://img.youtube.com/vi/${getVideoId(image.url)?.id}/0.jpg`
                      : `https://www.tiktok.com/api/img/?itemId=${getVideoId(image.url)?.id}`
                    : image.url
                }
                alt={`Recipe view ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {image.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
