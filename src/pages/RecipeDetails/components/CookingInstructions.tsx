import { Button } from '@/components/ui/button';
import { ZoomOutIcon } from 'lucide-react';
import { useState } from 'react';

interface CookingStep {
  id: number;
  description: string;
  img?: string;
}

interface CookingInstructionsProps {
  cookingSteps: CookingStep[];
  language: string;
  t: any;
}

/**
 * CookingInstructions Component
 *
 * Displays step-by-step cooking instructions
 * Allows users to mark steps as complete
 * Shows optional step images with zoom functionality
 *
 * @param cookingSteps - Array of cooking step objects
 * @param language - Current language (en/ar)
 * @param t - Translation function
 */
export const CookingInstructions: React.FC<CookingInstructionsProps> = ({
  cookingSteps,
  language,
  t,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [zoomedImage, setZoomedImage] = useState<{ src: string; stepId: number } | null>(null);

  /**
   * Toggle step completion status
   */
  const toggleStep = (id: number) => {
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  /**
   * Open image zoom modal
   */
  const handleImageClick = (imageSrc: string, stepId: number) => {
    setZoomedImage({ src: imageSrc, stepId });
  };

  /**
   * Close image zoom modal
   */
  const closeZoom = () => {
    setZoomedImage(null);
  };

  return (
    <div className="mb-6 sm:mb-8">
      {/* Section Header */}
      <h3 className="text-lg sm:text-xl font-bold text-primaryColor mb-2">
        {language === 'ar' ? 'تعليمات الطبخ' : 'Instructions'}
      </h3>

      {/* Steps List */}
      <div className="space-y-8 sm:space-y-12">
        {cookingSteps.map((step) => (
          <div key={step.id} className="flex gap-3 sm:gap-6">
            {/* Step Number Circle */}
            <div className="flex-shrink-0">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer ${
                  completedSteps.includes(step.id)
                    ? 'bg-primaryColor text-white'
                    : 'bg-primaryColor text-white'
                }`}
                onClick={() => toggleStep(step.id)}
              >
                <span className="font-bold text-sm sm:text-lg">{step.id}</span>
              </div>
            </div>

            {/* Step Content */}
            <div className="flex-1">
              {/* Step Description */}
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base font-semibold">
                {step.description}
              </p>

              {/* Checkbox and Optional Image */}
              <div className="flex items-start gap-2 flex-col">
            

                {/* Optional Step Image */}
                {step?.img && (
                  <div
                    className="relative w-52 h-52 lg:w-[320px] lg:h-[320px] group cursor-pointer"
                    onClick={() => handleImageClick(step.img!, step.id)}
                    title="Click to zoom"
                  >
                    <img
                      className="w-full h-full rounded-lg object-cover transition-all group-hover:brightness-75"
                      src={step.img}
                      alt={`Step ${step.id}`}
                    />
                    {/* Zoom Icon Overlay - appears on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black bg-opacity-60 rounded-full p-2">
                        <ZoomOutIcon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    {/* Small zoom indicator badge (always visible) */}
                    <div className="absolute top-1 right-1 bg-white bg-opacity-90 rounded-full p-0.5 shadow-sm">
                      <ZoomOutIcon className="h-3 w-3 text-gray-700" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={closeZoom}
        >
          {/* Zoomed Image Container - inline-block makes container fit the image */}
          <div className="relative inline-block max-w-6xl max-h-[90vh]">
            {/* Close Button positioned on top-right of image */}
            <Button
              onClick={closeZoom}
              variant="ghost"
              className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white hover:text-white"
            >
              <ZoomOutIcon />
            </Button>

            {/* Step Number Badge positioned on top-left of image */}
            <div className="absolute top-2 left-2 bg-primaryColor text-white px-3 py-1 rounded-full font-bold text-sm z-10">
              Step {zoomedImage.stepId}
            </div>

            <img
              src={zoomedImage.src}
              alt={`Step ${zoomedImage.stepId} zoomed`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};
