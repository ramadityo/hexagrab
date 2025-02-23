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
    warna: string[]; // ✅ Simpan hex color di sini
    image: string;
    insertImage: (image: string) => void;
    addColorArray: (colors: ColorRGB) => void;
    removeColorArray: () => void;
    setWarna: (warna: string[]) => void; // ✅ Fungsi untuk menyimpan hex color
}

const useDataStore = create<DataState>()((set) => ({
    colors: [],
    warna: [], // ✅ Hex color disimpan di sini
    image: "",
    insertImage: (image: string) => set(() => ({ image })),
    addColorArray: (colors: ColorRGB) => set((state) => ({ colors: [...state.colors, colors] })),
    removeColorArray: () => set(() => ({ colors: [] })),
    setWarna: (warna: string[]) => set(() => ({ warna })), // ✅ Fungsi untuk update hex color
}));

export default useDataStore;
