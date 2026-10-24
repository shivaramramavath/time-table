import { create } from "zustand";

import type {
  TimetableQueryParams,
  TimetableStatus,
} from "../types/timetable.types";

type TimetablesState = TimetableQueryParams & {
  setQuery: (query: string) => void;
  setStatus: (status: TimetableStatus | undefined) => void;
  setSortBy: (sortBy: TimetableQueryParams["sortBy"]) => void;
  setSortOrder: (sortOrder: TimetableQueryParams["sortOrder"]) => void;
  setLimit: (limit: number) => void;
  resetFilters: () => void;
};

const initialFilters: TimetableQueryParams = {
  query: "",
  status: undefined,
  sortBy: "createdAt",
  sortOrder: "desc",
  limit: 10,
};

export const useTimetablesStore = create<TimetablesState>((set) => ({
  ...initialFilters,

  setQuery: (query) => set({ query }),

  setStatus: (status) => set({ status }),

  setSortBy: (sortBy) => set({ sortBy }),

  setSortOrder: (sortOrder) => set({ sortOrder }),

  setLimit: (limit) => set({ limit }),

  resetFilters: () => set({ ...initialFilters }),
}));
