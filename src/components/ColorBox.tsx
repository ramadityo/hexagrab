"use client";

import React, { useEffect, useState } from "react";
import { hexConvert } from "@/utils/algorithm";
import useDataStore from "@/store/Store";
import toast from "react-hot-toast";
// icons
import { IoCheckmarkDoneOutline } from "react-icons/io5";

function ColorBox() {
    const colors = useDataStore((state) => state.colors);
    const warna = useDataStore((state) => state.warna); // ✅ Ambil hex dari store
    const setWarna = useDataStore((state) => state.setWarna); // ✅ Fungsi update hex color
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

    useEffect(() => {
        if (!colors || colors.length === 0) return;
        setWarna([]); 

        const newHexColors = colors.flatMap((colorObj) =>
            Object.values(colorObj || {}).map((rgb) => {
                if (!rgb || !Array.isArray(rgb) || rgb.length !== 3) return ""; // ✅ Pastikan RGB valid
    
                let hex = hexConvert(rgb[0], rgb[1], rgb[2]); // 🔹 Konversi ke HEX
                hex = hex.slice(0, 7); // 🔹 Pastikan hanya 7 karakter (terkadang bisa lebih panjang)
                
                return /^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : ""; 
            })
        );
        setWarna(newHexColors); 
    }, [colors, setWarna]);

    return (
        <div className="w-full h-12 my-3 flex flex-col ">
            <div className="flex justify-between flex-wrap gap-2 py-2 md:px-2 flex-col md:flex-row relative bg-gray-400/20 dark:bg-gray-400/10 rounded-md">
                {warna.map(
                    (color, index) =>
                        color && (
                            <button
                                key={index}
                                onClick={handleCopy(index)}
                                className="group h-12 md:flex-1 px-3 rounded-md cursor-pointer relative"
                                style={{ backgroundColor: color }}
                            >
                                <div className="transition-all opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/50 flex items-center justify-center">
                                    {copied ? <IoCheckmarkDoneOutline /> : color}
                                </div>
                            </button>
                        )
                )}
            </div>
        </div>
    );
}

export default ColorBox;
