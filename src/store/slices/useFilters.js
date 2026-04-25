// src/store/useFilters.ts
import { create } from 'zustand';
import { subDays } from 'date-fns';
export const useFilters = create((set) => ({
    startDate: subDays(new Date(), 30),
    endDate: new Date(),
    setRange: (start, end) => set({ startDate: start, endDate: end }),
}));
