import { create } from "zustand";
/* eslint-disable no-unused-vars */
interface ColorRGB {
    vibrantRgb?: number[];
    mutedRgb?: number[];
    darkVibrantRgb?: number[];
    darkMutedRgb?: number[];
    lightMutedRgb?: number[];
    lightVibrantRgb?: number[];
}

interface DataState {
    colors: ColorRGB[];
    image: string;
    insertImage: (image: string) => void;
    addColorArray: (colors: ColorRGB) => void;
    removeColorArray: () => void;
}

const useDataStore = create<DataState>()((set) => ({
    colors: [],
    image: "",
    insertImage: (image: string) => set((state) => ({ image: image })),
    addColorArray: (colors: ColorRGB) => set((state) => ({ colors: [...state.colors, colors] })),
    removeColorArray: () => set(() => ({ colors: [] })),
}));

export default useDataStore;
