"use client";

import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { IoCloudUpload } from "react-icons/io5";
import useDataStore from "@/store/Store";
import { getVibrantColor } from "@/utils/algorithm";

function UploadBox() {
    const insertImage = useDataStore((state) => state.insertImage);
    const removeColor = useDataStore((state) => state.removeColorArray);
    const warna = useDataStore((state) => state.warna); // ✅ Ambil hex dari store

    const [image, setImage] = useState<string | null>(null);
    const [isLightMode, setIsLightMode] = useState(false);

    // Deteksi tema light/dark mode
    useEffect(() => {
        const checkTheme = () => {
            setIsLightMode(window.matchMedia("(prefers-color-scheme: light)").matches);
        };
        
        checkTheme();
        window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", checkTheme);

        return () => {
            window.matchMedia("(prefers-color-scheme: light)").removeEventListener("change", checkTheme);
        };
    }, []);

    // Fungsi untuk menghandle input file
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        setImage(fileUrl);
        insertImage(fileUrl);
    }

    // Reset warna saat gambar berubah
    useEffect(() => {
        removeColor();
        if (image) {
            getVibrantColor(image);
        }
    }, [image]);

    return (
        <div 
            className={`relative h-[500px] w-[900px] max-w-full ${image ? "max-h-fit" : "max-h-full"} outline-dashed outline-2 rounded-md group overflow-hidden`}
            style={{ outlineColor: isLightMode ? warna[2] : warna[5] }}
        >
            {/* Background Blur */}
            {image && (
                <div
                    className="absolute inset-0 bg-cover bg-center blur-xl"
                    style={{ backgroundImage: `url(${image})` }}
                >
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                </div>
            )}

            {/* Overlay untuk Upload */}
            <div
                className={`absolute inset-0 flex z-20 flex-col items-center justify-center gap-2 transition-all 
                    ${image ? "text-white opacity-0 group-hover:opacity-100 bg-black/60" : "opacity-100 bg-black/0"}`}
            >
                <IconContext.Provider value={{ className: "text-6xl" }}>
                    <IoCloudUpload />
                </IconContext.Provider>
                <p className="font-sans">Drag and drop image here</p>
                <p className="font-sans">or</p>
                <label htmlFor="image" className="text-blue-500 font-sans cursor-pointer">Browse</label>
            </div>

            {/* Input File */}
            <input 
                type="file" 
                accept="image/png, image/gif, image/jpeg" 
                name="image" 
                id="image" 
                onChange={handleChange} 
                className="absolute z-20 inset-0 opacity-0 cursor-pointer" 
            />

            {/* Gambar Utama */}
            {image && (
                <img src={image} alt="Uploaded" className="relative z-10 max-h-full w-full md:h-[500px] object-contain" />
            )}
        </div>
    );
}

export default UploadBox;
