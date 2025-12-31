/**
 * RecipeDetailsSkeleton Component
 *
 * Loading skeleton for the recipe details page
 * Displays placeholder elements while data is being fetched
 */

export const RecipeDetailsSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="max-w-7xl mx-auto px-6 py-8 mb-[3rem] md:mb-[4rem] lg:mb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 sm:mb-2">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-1">
            {/* Image Gallery Skeleton */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] p-2 sm:p-4">
              <div className="relative h-[320px] sm:h-[420px] lg:h-[500px] rounded-2xl bg-gray-300 mb-4"></div>
              <div className="flex justify-center">
                <div className="flex gap-2 sm:gap-3 bg-white rounded-2xl p-2 sm:p-3 shadow-lg">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gray-300"></div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gray-300"></div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gray-300"></div>
                </div>
              </div>
            </div>

            {/* Instructions Skeleton */}
            <div className="order-3 lg:order-2 p-4">
              <div className="h-8 w-1/3 bg-gray-300 rounded mb-6"></div>
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3 sm:gap-6">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-2 p-4">
            <div className="space-y-4">
              <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
              <div className="h-10 w-3/4 bg-gray-300 rounded"></div>

              {/* Stats Grid Skeleton */}
              <div className="grid grid-cols-4 gap-6 my-6">
                <div className="h-16 bg-gray-300 rounded-lg"></div>
                <div className="h-16 bg-gray-300 rounded-lg"></div>
                <div className="h-16 bg-gray-300 rounded-lg"></div>
                <div className="h-16 bg-gray-300 rounded-lg"></div>
              </div>

              {/* Nutrition Card Skeleton */}
              <div className="h-24 bg-gray-300 rounded-2xl"></div>

              {/* Ingredients Skeleton */}
              <div className="space-y-4 mt-8">
                <div className="h-8 w-1/2 bg-gray-300 rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-8 bg-gray-300 rounded-lg"></div>
                  <div className="h-8 bg-gray-300 rounded-lg"></div>
                  <div className="h-8 bg-gray-300 rounded-lg"></div>
                  <div className="h-8 bg-gray-300 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
