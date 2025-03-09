"use client";
import { Vibrant } from "node-vibrant/browser";
import useDataStore from "@/store/Store";

function getVibrantColor(image: string) {
    const addColorArray = useDataStore.getState().addColorArray;

    const vibrant = new Vibrant(image);
    return vibrant.getPalette().then((palette) => {
        const colors = {
            lightMutedRgb: palette.LightMuted?.rgb,
            mutedRgb: palette.Muted?.rgb,
            lightVibrantRgb: palette.LightVibrant?.rgb,
            vibrantRgb: palette.Vibrant?.rgb,
            darkMutedRgb: palette.DarkMuted?.rgb,
            darkVibrantRgb: palette.DarkVibrant?.rgb,
        };
        addColorArray(colors);
    });
}

const hexConvert = (r: number, g: number, b: number): string => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase()}`;
};


export { getVibrantColor, hexConvert };
