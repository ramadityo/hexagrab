"use client";
import { Vibrant } from "node-vibrant/browser";
import useDataStore from "@/store/Store";

function getVibrantColor(image: string) {
    const addColorArray = useDataStore.getState().addColorArray;

    const vibrant = new Vibrant(image);
    return vibrant.getPalette().then((palette) => {
        const colors = {
            vibrantRgb: palette.Vibrant?.rgb,
            mutedRgb: palette.Muted?.rgb,
            darkVibrantRgb: palette.DarkVibrant?.rgb,
            darkMutedRgb: palette.DarkMuted?.rgb,
            lightMutedRgb: palette.LightMuted?.rgb,
            lightVibrantRgb: palette.LightVibrant?.rgb,
        };
        addColorArray(colors);
    });
}

function hexConvert(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export { getVibrantColor, hexConvert };
