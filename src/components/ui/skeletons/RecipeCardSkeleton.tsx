import { Card, CardContent } from "../card";


export const RecipeCardSkeleton = () => {
  return (
    <Card className="bg-white rounded-3xl border-0 shadow-sm">
      <CardContent className="p-4 sm:p-6 animate-pulse">

        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            <div className="h-2 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>

        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>

        <div className="w-full h-60 sm:h-80 bg-gray-200 rounded-2xl mb-4"></div>

        <div className="flex items-center gap-4 sm:gap-6 mb-4">
          <div className="w-8 h-6 bg-gray-200 rounded"></div>
          <div className="w-8 h-6 bg-gray-200 rounded"></div>
          <div className="w-8 h-6 bg-gray-200 rounded"></div>
          <div className="ml-auto w-8 h-6 bg-gray-200 rounded"></div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-full border border-gray-200 bg-gray-50">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="flex-1 h-4 bg-gray-200 rounded"></div>
          <div className="w-12 h-6 bg-gray-200 rounded-full"></div>
        </div>
      </CardContent>
    </Card>
  );
};
