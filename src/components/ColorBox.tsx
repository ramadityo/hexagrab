"use client";

import React, { useEffect, useState } from "react";
import { getVibrantColor, hexConvert } from "@/utils/algorithm";
import useDataStore from "@/store/Store";
import toast from "react-hot-toast";
// icons
import { IoIosCopy } from "react-icons/io";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

function ColorBox() {
    const image = useDataStore((state) => state.image);
    const colors = useDataStore((state) => state.colors);
    const [hexColor, setHexColor] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    const handleCopy = (index: number) => {
        return (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            navigator.clipboard.writeText(hexColor[index]).then(() => {
                toast.success("Successfully copied!");
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 1000);
            });
        };
    };

    useEffect(() => {
        setHexColor([]);

        const newHexColors = colors.flatMap((colorObj) => Object.values(colorObj).map((rgb) => (rgb ? hexConvert(rgb[0], rgb[1], rgb[2]) : "")));

        setHexColor(newHexColors);
        console.log(newHexColors);
    }, [colors]);

    return (
        <div className="w-full h-12 mt-4 flex flex-col gap-4">
            <p className={`text-center space-y-4 font-sans font-bold ${colors ? "hidden" : ""}`}>Dominant Color</p>
            <div className="flex justify-between flex-wrap gap-2 relative">
                {hexColor.map(
                    (color, index) =>
                        color && (
                            <button key={index} onClick={handleCopy(index)} className="group flex-1 h-12 rounded-md cursor-pointer relative" style={{ backgroundColor: color }}>
                                <div className="transition-all opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/50 flex items-center justify-center">{copied ? <IoCheckmarkDoneOutline /> : <IoIosCopy />}</div>
                            </button>
                        )
                )}
            </div>
        </div>
    );
}

export default ColorBox;
