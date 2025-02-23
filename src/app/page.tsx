"use client"
import UploadBox from "@/components/UploadBox";
import Image from "next/image";
import ColorBox from "@/components/ColorBox";
import useDataStore from "@/store/Store";
import { useEffect, useState } from "react";

export default function Home() {
    const warna = useDataStore((state) => state.warna); // ✅ Ambil hex dari store
    const [isLightMode, setIsLightMode] = useState(false);

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

    return (
        <div className="w-full h-screen flex md:items-center justify-center">
            <div className="w-max  max-w-full p-3 pb-8 h-max max-h-full text-center">
                <h1 className="text-5xl font-heading">HexaGrab</h1>
                <h2 className="text-xl mb-3 font-heading">
                    <span className="opacity-60">Turn Images into </span>
                    <span style={{color: isLightMode ? warna[1] : warna[4]}}>Colors</span>
                    <span className="opacity-60"> with One Upload</span>
                </h2>
                <UploadBox />
                <ColorBox />
            </div>
        </div>
    );
}
