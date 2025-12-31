import { Card } from '../card';

export const RecipeFormSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Basic Information Card */}
      <Card className="p-6 md:p-8 border-0 shadow-lg rounded-2xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="h-5 w-40 bg-gray-300 rounded"></div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded-md"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="h-10 bg-gray-200 rounded-md"></div>
            <div className="h-10 bg-gray-200 rounded-md"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-300 rounded"></div>
            <div className="h-48 w-full bg-gray-200 rounded-lg"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-36 bg-gray-300 rounded"></div>
            <div className="h-20 w-full bg-gray-200 rounded-lg"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="h-24 w-full bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </Card>

      <Card className="p-6 md:p-8 border-0 shadow-lg rounded-2xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="h-5 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 w-full bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </Card>

      <Card className="p-6 md:p-8 border-0 shadow-lg rounded-2xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="h-5 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 w-full bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </Card>

      <div className="pt-4">
        <div className="h-14 w-full bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  );
};
