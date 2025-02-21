"use client";

import React, { useState, useEffect } from "react";
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
        <div
            className={`relative md:h-[500px] w-[900px] 
                max-w-full max-h-full outline-dashed outline-2 outline-gray-400 rounded-xl  
                group overflow-hidden`}
        >
            {/* Overlay untuk Upload */}
            <div
                className={`transition-all absolute inset-0 flex flex-col ${image && "text-white"} items-center justify-center gap-2 
                    ${image ? "opacity-0 group-hover:opacity-100 bg-black/60" : "opacity-100 bg-black/0"}`}
            >
                <IconContext.Provider value={{ className: "text-6xl" }}>
                    <div>
                        <IoCloudUpload />
                    </div>
                </IconContext.Provider>
                <p className="font-sans">Drag and drop image here</p>
                <p className="font-sans">or</p>
                <p className="text-blue-500 font-sans">Browse</p>
            </div>

            {/* Input File */}
            <input type="file"  accept="image/png, image/gif, image/jpeg" name="image" id="image" onChange={handleChange} className="absolute inset-0 opacity-0" />

            {/* Gambar */}
            {image && (
                <>
                <img src={image} alt="" className="text-center max-h-full w-full md:h-[500] object-contain" />
                </>
            )}
        </div>
    );
}

export default UploadBox;
