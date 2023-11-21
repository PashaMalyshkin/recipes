export const capitalize = (query: string) => {
  return query.slice(0, 1).toUpperCase() + query.slice(1).toLowerCase();
};
