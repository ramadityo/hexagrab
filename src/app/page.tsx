"use client"
import UploadBox from "@/components/UploadBox";
import Image from "next/image";
import ColorBox from "@/components/ColorBox";
import useDataStore from "@/store/Store";
import { useEffect, useState } from "react";

export default function Home() {
    const warna = useDataStore((state) => state.warna);
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full flex justify-center">
                <UploadBox />
                {/* <ColorBox /> */}
            </div>
        </div>
    );
}
