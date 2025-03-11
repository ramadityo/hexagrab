"use client";
import React, { useState, useEffect, useRef } from "react";
// import * as PIXI from "pixi.js"

export default function DepthImage() {

    const containerRef = useRef<HTMLDivElement>(null);
    const handleDepth = () =>{

    }

    useEffect(() =>{
        handleDepth();
    }, [])
    return (
        <div className="relative w-full h-full" ref={containerRef}>   
        </div>
    );
}