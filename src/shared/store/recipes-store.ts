import { create } from "zustand";

interface RecipesState {
  search: string;
  limit: number;
  offset: number;
  actions: {
    setLimit: (limit: string) => void;
    increaseOffset: () => void;
    decreaseOffset: () => void;
    setSearch: (search: string) => void;
  };
}

export const useRecipesStore = create<RecipesState>()((set) => ({
  search: "",
  limit: 5,
  offset: 0,
  actions: {
    setSearch: (search) => set(() => ({ search, offset: 0 })),
    setLimit: (limit) => set(() => ({ limit: Number(limit) })),
    increaseOffset: () =>
      set((state) => ({ offset: state.offset + state.limit })),
    decreaseOffset: () =>
      set((state) => ({ offset: state.offset - state.limit })),
  },
}));

export const useRecipesPaginationLimit = () =>
  useRecipesStore((state) => state.limit);

export const useRecipesPaginationOffset = () =>
  useRecipesStore((state) => state.offset);

export const useRecipesSearch = () => useRecipesStore((state) => state.search);

export const useRecipesActions = () =>
  useRecipesStore((state) => state.actions);
