import { Skeleton } from "./ui/skeleton";

export const RecipesListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      <Skeleton className="h-[300px]" />
      <Skeleton className="h-[300px]" />
      <Skeleton className="h-[300px]" />
      <Skeleton className="h-[300px]" />
      <Skeleton className="h-[300px]" />
    </div>
  );
};
