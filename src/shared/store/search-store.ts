import { create } from "zustand";

interface SearchState {
  search: string;
  actions: {
    setSearch: (state: string) => void;
  };
}

export const useSearchStore = create<SearchState>()((set) => ({
  search: "",
  actions: {
    setSearch: (value) => set(() => ({ search: value })),
  },
}));

export const useSearch = () => useSearchStore((state) => state.search);
export const useSearchActions = () => useSearchStore((state) => state.actions);
