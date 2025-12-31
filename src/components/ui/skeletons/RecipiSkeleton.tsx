import { Card, CardContent } from '../card';

type RecipeSkeletonProps = {
  variant?: 'grid' | 'list';
};

export const RecipiSkeleton = ({ variant = 'grid' }: RecipeSkeletonProps) => {
  if (variant === 'list') {
    return (
      <Card className="bg-white rounded-3xl border-0 shadow-sm">
        <CardContent className="p-4 flex gap-4 animate-pulse">
          <div className="w-40 h-28 bg-gray-200 rounded-lg"></div>

          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            <div className="flex gap-3">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-3xl border-0 shadow-sm">
      <CardContent className="p-4 animate-pulse">
        <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="flex gap-3 mb-4">
          <div className="h-3 bg-gray-200 rounded w-12"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-14"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </CardContent>
    </Card>
  );
};
