"use client";

import React, { useState, useEffect, useRef } from "react";
import { IconContext } from "react-icons";
import { IoCloudUpload } from "react-icons/io5";
import useDataStore from "@/store/Store";
import { getVibrantColor } from "@/utils/algorithm";
import { moveContainerUpload, setColorAnimation } from "@/utils/animation";

function UploadBox() {
    const insertImage = useDataStore((state) => state.insertImage);
    const removeColor = useDataStore((state) => state.removeColorArray);
    const warna = useDataStore((state) => state.warna); // ✅ Ambil hex dari store

    const [image, setImage] = useState<string | null>(null);
    const [isLightMode, setIsLightMode] = useState(false);

    const setAnimateTrue = useDataStore((state) => state.setAnimateTrue);
    const isAnimate = useDataStore((state) => state.isAnimate);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file);

        setImage(fileUrl);
        insertImage(fileUrl);

        setAnimateTrue();

        setTimeout(() => {
            moveContainerUpload(isAnimate);
        }, 500)
    }

    useEffect(() => {
        setColorAnimation();
    }, [])

    useEffect(() => {
        removeColor();
        if (image) {
            getVibrantColor(image);
        }
    }, [image]);

    const imageRef = useRef<HTMLDivElement>(null);

    return (
        <div className="upload-box h-[450px] w-[600px] max-md:w-full ">
            <div className={`box relative  h-full w-full outline-dashed outline-2 rounded-xl group overflow-hidden`} style={{ outlineColor: isLightMode ? warna[2] : warna[5] }}>
                <div
                    className={`absolute inset-0 flex z-20 flex-col items-center justify-center gap-2 transition-all 
                    ${image ? "text-white opacity-0 group-hover:opacity-100 bg-black/60" : "opacity-100 bg-black/0"}`}
                >
                    <IconContext.Provider value={{ className: "text-6xl" }}>
                        <IoCloudUpload />
                    </IconContext.Provider>
                    <p className="font-sans">Drag and drop image here</p>
                    <p className="font-sans">or</p>
                    <label htmlFor="image" className="text-blue-500 font-sans cursor-pointer">
                        Browse
                    </label>
                </div>

                <input type="file" accept="image/png, image/gif, image/jpeg" name="image" id="image" onChange={handleChange} className="absolute z-20 inset-0 opacity-0 cursor-pointer" />

                {image && <img src={image} alt="Uploaded" className="absolute left-1/2 -translate-x-1/2 top-0 z-10 scale-150" />}
            </div>
        </div>
    );
}

export default UploadBox;
