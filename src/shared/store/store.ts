import { create } from "zustand";

interface SearchState {
  search: string;
  setSearch: (state: string) => void;
}

export const useSearch = create<SearchState>()((set) => ({
  search: "",
  setSearch: (value) => set(() => ({ search: value })),
}));
