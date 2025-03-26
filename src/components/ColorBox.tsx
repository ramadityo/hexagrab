"use client";

import React, { useEffect, useState } from "react";
import { hexConvert } from "@/utils/algorithm";
import useDataStore from "@/store/Store";
import toast from "react-hot-toast";
// icons
import { IoCheckmarkDoneOutline } from "react-icons/io5";

function ColorBox() {
    const colors = useDataStore((state) => state.colors);
    const warna = useDataStore((state) => state.warna);
    const setWarna = useDataStore((state) => state.setWarna);
    const [copied, setCopied] = useState(false);

    const handleCopy = (index: number) => {
        return (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            navigator.clipboard.writeText(warna[index]).then(() => {
                toast.success("Successfully copied!");
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 1000);
            });
        };
    };

    const bulkCopy = () => {
        return (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            navigator.clipboard.writeText(`Hex codes from HexaGrab, enjoy!\n${warna.join("\n")}`).then(() => {
                toast.success("Bulk color copied!");
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 1000);
            });
        };
    };

    useEffect(() => {
        if (!colors || colors.length === 0) return;
        setWarna([]);

        const newHexColors = colors.flatMap((colorObj) =>
            Object.values(colorObj || {}).map((rgb) => {
                if (!rgb || !Array.isArray(rgb) || rgb.length !== 3) return "";

                let hex = hexConvert(rgb[0], rgb[1], rgb[2]);
                hex = hex.slice(0, 7);

                return /^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : "";
            })
        );
        setWarna(newHexColors);
    }, [colors, setWarna]);

    return (
        <div className="w-full flex h-full flex-col gap-6">
            <div>
                <div className="grid grid-cols-3 gap-4 relative rounded-md">
                    {warna.map(
                        (color, index) =>
                            (
                                <button key={index} onClick={handleCopy(index)} className="button opacity-0 group h-12 md:flex-1 px-3 rounded-md cursor-pointer relative" style={{ backgroundColor: color }}>
                                    <div className="transition-all opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/50 flex items-center justify-center">{copied ? <IoCheckmarkDoneOutline /> : color}</div>
                                </button>
                            )
                    )}
                </div>
                <button className="copy-button w-full dark:bg-white dark:text-black bg-[#171717] text-white p-3 rounded-md mt-4 font-sans" onClick={bulkCopy()}>
                    Bulk copy!
                </button>
            </div>
            <div className="mt-4 title max-sm:hidden">
                <h1 className="font-sans font-bold text-3xl text-white">Gradient Map</h1>
            </div>

            <div
                className="relative gradients w-full h-full rounded-xl overflow-hidden max-sm:hidden"
                style={{
                    background: `linear-gradient(to bottom, ${warna[0]}, ${warna[1]}, ${warna[2]}, ${warna[3]}, ${warna[4]}, ${warna[5]})`
                }}
            >
                <div className="overlay-grad absolute inset-0 bg-white"></div>
            </div>
        </div>
    );
}

export default ColorBox;
