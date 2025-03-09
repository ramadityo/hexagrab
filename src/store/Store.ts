import { create } from "zustand";

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
    warna: string[]; 
    image: string;
    isAnimate: boolean;
    insertImage: (image: string) => void;
    addColorArray: (colors: ColorRGB) => void;
    removeColorArray: () => void;
    setWarna: (warna: string[]) => void;
    setAnimate: (animate: boolean) => void;
    setAnimateTrue: () => void;
}

const useDataStore = create<DataState>()((set) => ({
    colors: [],
    warna: [],
    image: "",
    isAnimate: false,
    setAnimate: () => set((state) => ({ isAnimate: !state.isAnimate })),
    setAnimateTrue: () => set(() => ({ isAnimate: true })),
    insertImage: (image: string) => set(() => ({ image })),
    addColorArray: (colors: ColorRGB) => set((state) => ({ colors: [...state.colors, colors] })),
    removeColorArray: () => set(() => ({ colors: [] })),
    setWarna: (warna: string[]) => set(() => ({ warna })),
}));

export default useDataStore;
