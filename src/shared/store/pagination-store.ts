import { create } from "zustand";

interface PaginationState {
  limit: number;
  offset: number;
  actions: {
    setLimit: (limit: string) => void;
    increaseOffset: () => void;
    decreaseOffset: () => void;
  };
}

export const usePaginationStore = create<PaginationState>()((set) => ({
  limit: 5,
  offset: 0,
  actions: {
    setLimit: (value) => set(() => ({ limit: Number(value) })),
    increaseOffset: () =>
      set((state) => ({ offset: state.offset + state.limit })),
    decreaseOffset: () =>
      set((state) => ({ offset: state.offset - state.limit })),
  },
}));

export const usePaginationLimit = () =>
  usePaginationStore((state) => state.limit);

export const usePaginationOffset = () =>
  usePaginationStore((state) => state.offset);

export const usePaginationActions = () =>
  usePaginationStore((state) => state.actions);
