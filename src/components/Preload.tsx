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

    const { contextSafe } = useGSAP({ scope: container });
    // const textChild = gsap.utils.toArray(textPreload.current);
    const depthContainer = useRef<HTMLDivElement | null>(null);

    const initAnimation = contextSafe(() => {
        // gsap.set(depthContainer.current, {scale: 1.1})
        // gsap.set(textChild, {yPercent: 30})

        let tl = gsap.timeline();
        tl.from(textPreload.current, {
            duration: 1,
            yPercent: 50,
            opacity: 0,
            stagger: .2,
            willChange: "transform",
            ease: "expo.out"
        }, .1)
        
        tl.from(depthContainer.current, {
            duration: 2,
            opacity: 0,
            scale: 1.2,
            ease: "expo.out",
            willChange: "transform",

        }, .2)

    });

    useEffect(() => {
        // textPreload.current?.classList.remove("opacity-0");
        setTimeout(() => {
            depthContainer.current?.classList.remove("opacity-0");
            textPreload.current.forEach((el) => el.classList.remove("opacity-0"));

            initAnimation();
        }, 500)
        // gsap.set()
    }, []);
    return (
        <div className="fixed inset-0 z-50 overflow-hidden" ref={container}>
            <div ref={depthContainer} className="opacity-0 absolute inset-0">
                <ImageDepthMap originalImg={"/bg-org.webp"} depthImg={"/bg-depth.webp"} verticalThreshold={100} horizontalThreshold={100} className="max-sm:absolute max-sm:inset-0" />
            </div>
            {/* <Image src={"/bg-org.webp"} alt="Image" fill className="object-cover" /> */}
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
