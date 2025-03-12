"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
// import DepthImage from "./DepthImage";
import ImageDepthMap from "react-depth-map";
import { setLoad, loadAnimation } from "@/utils/animation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preload() {
    const textPreload = useRef<HTMLElement[]>([]);
    const container = useRef<HTMLDivElement>(null);

    const addRef = (el: HTMLElement | null) => {
        if (el && !textPreload.current.includes(el)) {
            textPreload.current.push(el);
        }
    };

    const { contextSafe } = useGSAP({scope: container})

    useEffect(() => {
        // textPreload.current?.classList.remove("opacity-0");
        textPreload.current.forEach((el) => el.classList.remove("opacity-0"));
        // gsap.set()
    }, []);
    return (
        <div className="fixed inset-0 z-50" ref={container}>
            <ImageDepthMap originalImg={"/bg-org.webp"} depthImg={"/bg-depth.webp"} verticalThreshold={100} horizontalThreshold={100} className="max-sm:absolute max-sm:inset-0" />
            <div className="absolute inset-0 bg-[#171717] opacity-50"></div>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 flex flex-col items-center justify-center">
                <h1 ref={addRef} className="text-preload opacity-0 font-sans text-9xl font-bold text-white">
                    HexaGrab
                </h1>
                <p ref={addRef} className="text-preload opacity-0 font-sans text-xl font-medium text-white">
                    Turn Images into Colors with One Upload.
                </p>
            </div>
        </div>
    );
}
