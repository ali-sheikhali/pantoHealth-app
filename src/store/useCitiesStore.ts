import { create } from "zustand";

interface CityStore {
  selectedCity: string | null;
  setSelectedCity: (city: string) => void;
}

export const useCitiesStore = create<CityStore>((set) => ({
  selectedCity: null,
  setSelectedCity: (city) => set({ selectedCity: city }),
}));
