"use client";

import React, { useState, useEffect, useRef } from "react";
import { IconContext } from "react-icons";
import { IoCloudUpload } from "react-icons/io5";
import useDataStore from "@/store/Store";
import { getVibrantColor } from "@/utils/algorithm";
import { moveContainerUpload, setColorAnimation } from "@/utils/animation";
import gsap from "gsap";
import Draggable from "gsap/Draggable";


export default function UploadButton() {
    const isAnimate = useDataStore((state) => state.isAnimate);
    const insertImage = useDataStore((state) => state.insertImage);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        insertImage(fileUrl);

        setTimeout(() => {
            moveContainerUpload(isAnimate);
        }, 500);
    }

    return (
        <div className="button-upload absolute z-50 bottom-6 right-6 flex items-center justify-center rounded-full w-14 h-14 bg-white overflow-hidden">
            <IconContext.Provider value={{ className: ` ${isAnimate ? "text-black text-2xl" : "text-white"}` }}>
                <IoCloudUpload />
            </IconContext.Provider>
            <input type="file" accept="image/png, image/gif, image/jpeg" name="image" id="image" onChange={handleChange} className="absolute z-20 inset-0 opacity-0 cursor-pointer" />

        </div>
    );
}
