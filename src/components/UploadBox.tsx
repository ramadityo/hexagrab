"use client";

/* eslint-disable no-unused-vars */
import Image from "next/image";
import React, { useState, useEffect } from "react";

// icons
import { IconContext } from "react-icons";
import { IoCloudUpload } from "react-icons/io5";
import useDataStore from "@/store/Store";
import { getVibrantColor } from "@/utils/algorithm";

function UploadBox() {
    const [image, setImage] = useState<string>("");
    const insertImage = useDataStore((state) => state.insertImage);
    const removeColor = useDataStore((state) => state.removeColorArray);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        // console.log(e.target.files);
        const file = URL.createObjectURL(e.target.files[0]);
        setImage(file);
        insertImage(file);
    }

    useEffect(() => {
        removeColor();
        if (image) {
            getVibrantColor(image);
        }
    }, [image]);

    return (
        <div className="w-[400px] h-[250px] outline-dashed outline-2 outline-white rounded-xl relative group overflow-hidden">
            <div className={`transition-all ${image ? "opacity-0 group-hover:opacity-100 bg-black/50" : "opacity-100 bg-black/0"} absolute inset-0 flex flex-col items-center justify-center gap-2`}>
                <IconContext.Provider value={{ className: "text-6xl text-white" }}>
                    <div>
                        <IoCloudUpload />
                    </div>
                </IconContext.Provider>
                <p className="font-sans text-white">Drag and drop image here</p>
                <p className="font-sans text-white">or</p>
                <p className="text-blue-500 font-sans">Browse</p>
            </div>
            <input type="file" name="image" id="image" onChange={(e) => handleChange(e)} className="absolute inset-0 opacity-0" />
            {image && <Image width={200} height={200} alt="" className="w-full h-full object-contain" src={image} unoptimized />}
        </div>
    );
}

export default UploadBox;
