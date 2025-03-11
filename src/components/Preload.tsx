"use client";

import Image from "next/image";
import React from "react";
import DepthImage from "./DepthImage";
// import ImageDepthMap from "react-depth-map";

export default function Preload() {
    return (
        <div className="fixed inset-0 bg-white z-50">
            {/* <Image unoptimized fill src="/background.webp" alt="loading" className='object-cover' /> */}
            {/* <ImageDepthMap originalImg={"/bg-org.webp"} depthImg={"/bg-depth.webp"} verticalThreshold={100} horizontalThreshold={100} className="max-sm:absolute max-sm:inset-0" /> */}
            <DepthImage />
            {/* <div className="absolute inset-0 bg-[#171717] opacity-50"></div> */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 flex flex-col items-center justify-center">
            <h1 className="font-sans text-9xl font-bold text-white">HexaGrab</h1>
            <p className="font-sans text-xl font-medium text-white">Currently under development!</p>
            </div>
        </div>
    );
}
