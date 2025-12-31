

export function CommentSkeleton() {
  return (
    <div className="flex gap-3 sm:gap-4 animate-pulse">
   
      <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
        <div className="w-full h-full rounded-full" />
      </div>

      <div className="flex-1">
  
        <div className="flex flex-row sm:items-center justify-between gap-1 sm:gap-3 mb-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <div className="h-4 w-32 sm:w-40" /> 
            <div className="h-3 w-20" />   
          </div>
          <div className="h-4 w-4 rounded" />
        </div>

        <div className="flex items-center gap-1 sm:gap-2 mb-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 rounded" />
          ))}
        </div>
        <div className="h-4 w-full sm:w-3/4 mb-2" />
        <div className="h-4 w-2/3" />
      </div>
    </div>
  );
}
