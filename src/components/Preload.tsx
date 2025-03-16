"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { setLoad, loadAnimation } from "@/utils/animation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useDataStore from "@/store/Store";

export default function Preload() {
    const textPreload = useRef<HTMLElement[]>([]);
    const container = useRef<HTMLDivElement | null>(null);
    
    const setIsLoadTrue = useDataStore((state) => state.setIsLoadTrue)

    const addRef = (el: HTMLElement | null) => {
        if (el && !textPreload.current.includes(el)) {
            textPreload.current.push(el);
        }
    };

    // const textChild = gsap.utils.toArray(textPreload.current);
    const { contextSafe } = useGSAP({ scope: container });
    const depthContainer = useRef<HTMLImageElement | null>(null);
    const progressParent = useRef<HTMLDivElement>(null);
    const progressBar = useRef<HTMLDivElement>(null);

    const initAnimation = contextSafe(() => {
        gsap.set(textPreload.current, { yPercent: 30, opacity: 0 });
        gsap.set(depthContainer.current, { opacity: 0, scale: 1.2 });
        gsap.set(progressParent.current, { opacity: 0});
        gsap.set(progressBar.current, { width: 0});

        let tl = gsap.timeline();
        tl.to(
            textPreload.current,
            {
                duration: 1,
                yPercent: 0,
                opacity: 1,
                stagger: 0.2,
                willChange: "transform",
                ease: "expo.out",
            },
            0.1
        );

        tl.to(
            depthContainer.current,
            {
                duration: 2,
                opacity: 1,
                scale: 1.1,
                ease: "expo.out",
                willChange: "transform",
            },
            0.2
        );
        tl.to(progressParent.current, {
            opacity: 1,
            duration: 0.5,
            ease: "expo.out",
        }, 1);
        tl.to(progressBar.current, {
            duration: 2,
            width: "100%",
            transformOrigin: "center",
            ease: "linear",
            onComplete: () => {
                setTimeout(() => {
                    setIsLoadTrue();
                }, 10)
                gsap.to(container.current, { opacity: 0, duration: 1, ease: "expo.inOut", onComplete: () => {
                    container.current!.style.display = "none";
                }});
            }
        }, 1)
    });

    useEffect(() => {
        // textPreload.current?.classList.remove("opacity-0");
        setTimeout(() => {

            initAnimation();
        }, 500);
        // gsap.set()
    }, []);
    return (
        <div className="fixed inset-0 z-50 overflow-hidden" ref={container}>
            <Image unoptimized ref={depthContainer} src={"/bg-org.webp"} alt="Landscape art by @ぴくす https://www.pixiv.net/en/users/67381928" fill className="object-cover opacity-0" />
            <div className="absolute inset-0 bg-[#171717] opacity-50"></div>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col items-center justify-center">
                    <h1 ref={addRef} className="text-center leading-none text-preload opacity-0 font-sans max-sm:text-7xl text-9xl font-bold text-white">
                        HexaGrab
                    </h1>
                    <p ref={addRef} className="max-sm:text-base text-center text-preload opacity-0 font-sans text-xl font-medium text-white">
                        Turn Images into Colors with One Upload.
                    </p>
                </div>
                <div ref={progressParent} className="w-1/2 h-1 overflow-hidden rounded-full opacity-0">
                    <div ref={progressBar} className="w-full h-full bg-white"></div>
                </div>
            </div>
        </div>
    );
}
