export const GoalCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-slate-200 p-5 animate-pulse">
      <div className="flex items-start gap-3">
        {/* Grip */}
        <div className="w-5 h-5 bg-slate-300 rounded"></div>

        <div className="flex-1 space-y-3">
          {/* Title & Description */}
          <div className="h-6 w-3/4 bg-slate-300 rounded"></div>
          <div className="h-4 w-full bg-slate-200 rounded"></div>
          <div className="h-4 w-5/6 bg-slate-200 rounded"></div>

          {/* Badges */}
          <div className="flex gap-2 mt-2">
            <div className="h-5 w-16 bg-slate-300 rounded-full"></div>
            <div className="h-5 w-16 bg-slate-300 rounded-full"></div>
            <div className="h-5 w-20 bg-slate-300 rounded-full"></div>
          </div>

          {/* Progress */}
          <div className="space-y-2 mt-3">
            <div className="h-4 w-1/4 bg-slate-300 rounded"></div>
            <div className="w-full h-3 bg-slate-200 rounded"></div>
          </div>

          {/* Calendar info */}
          <div className="flex justify-between mt-3 text-sm">
            <div className="h-4 w-20 bg-slate-300 rounded"></div>
            <div className="h-4 w-24 bg-slate-300 rounded"></div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-3">
            <div className="h-8 w-20 bg-slate-300 rounded"></div>
            <div className="h-8 w-20 bg-slate-300 rounded"></div>
            <div className="h-8 w-8 bg-slate-300 rounded"></div>
            <div className="h-8 w-8 bg-slate-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
