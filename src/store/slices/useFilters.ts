// src/store/useFilters.ts
import { create } from 'zustand';
import { subDays } from 'date-fns';

interface FiltersState {
  startDate: Date;
  endDate: Date;
  setRange: (start: Date, end: Date) => void;
}

export const useFilters = create<FiltersState>((set) => ({
  startDate: subDays(new Date(), 30),
  endDate: new Date(),
  setRange: (start, end) => set({ startDate: start, endDate: end }),
}));