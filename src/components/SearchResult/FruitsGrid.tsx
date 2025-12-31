import { Search } from "lucide-react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { FruitCard } from "../../pages/Fruits/FruitCard";
import { useGetFruitsQuery } from "../../redux/Features/Fruit/fruitApi";
import { RecipiSkeleton } from "../ui/skeletons/RecipiSkeleton";
import { useLanguage } from "../../contexts/LanguageContext";

export const FruitsGrid = ({debouncedQuery}:{debouncedQuery:string}) => {
     const {language,t} = useLanguage()
  const {
    allData: fruits,
    isLoading,
    isFetching,
    lastElementRef,
    hasMore,
  } = useInfiniteScroll(useGetFruitsQuery, { q: debouncedQuery || undefined }, 4);
 console.log("debouncedQuery",debouncedQuery)
  return (
    <div>
      <div className="mb-6 text-gray-600">
         {t.common.show} {fruits.length} {language=="ar"?"الفواكه":"fruits"}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <RecipiSkeleton key={i} variant="grid" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fruits.map((fruit, index) => (
              <FruitCard
                key={`${fruit._id}-${index}`}
                fruit={fruit}
                ref={index === fruits.length - 1 && hasMore ? lastElementRef : null}
              />
            ))}
          </div>

          {/* Loading more indicator */}
          {hasMore && (
            <div ref={lastElementRef} className="p-4 text-center">
              {isFetching && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <RecipiSkeleton key={i} variant="grid" />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* No results message */}
          {fruits.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">{language=="ar"?"لا توجد فواكه ":"No fruits found"}</h3>
               <p className="text-gray-500">{t.common.notFoundDusc}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
