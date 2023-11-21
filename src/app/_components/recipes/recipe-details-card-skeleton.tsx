import { Skeleton } from "../ui/skeleton";

export const RecipeDetailsCardSkeleton = () => {
  return (
    <>
      <div className="h-8 w-8"></div>
      <Skeleton className="m-auto h-[220px] max-w-5xl" />
    </>
  );
};
