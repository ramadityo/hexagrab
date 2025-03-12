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
    isLoad: boolean;
    insertImage: (image: string) => void;
    addColorArray: (colors: ColorRGB) => void;
    removeColorArray: () => void;
    setWarna: (warna: string[]) => void;
    setAnimate: (animate: boolean) => void;
    setAnimateTrue: () => void;
    setIsLoadTrue: () => void;
}

const useDataStore = create<DataState>()((set) => ({
    colors: [],
    warna: [],
    image: "",
    isAnimate: false,
    isLoad: false,
    setAnimate: () => set((state) => ({ isAnimate: !state.isAnimate })),
    setIsLoadTrue: () => set(() => ({ isLoad: true })), 
    setAnimateTrue: () => set(() => ({ isAnimate: true })),
    insertImage: (image: string) => set(() => ({ image })),
    addColorArray: (colors: ColorRGB) => set((state) => ({ colors: [...state.colors, colors] })),
    removeColorArray: () => set(() => ({ colors: [] })),
    setWarna: (warna: string[]) => set(() => ({ warna })),
}));

export default useDataStore;
