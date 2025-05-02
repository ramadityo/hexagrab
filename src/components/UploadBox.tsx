"use client";

import React, { useState, useEffect, useRef } from "react";
import { IconContext } from "react-icons";
import { IoCloudUpload } from "react-icons/io5";
import useDataStore from "@/store/Store";
import { getVibrantColor } from "@/utils/algorithm";
import { moveContainerUpload, setColorAnimation } from "@/utils/animation";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
// import { InertiaPlugin } from "./InertiaPlugin";
// import { InertiaPlugin } from "./InertiaPluginBt";
// import InertiaPlugin from "gsap-trial/InertiaPlugin";

// gsap.registerPlugin(Draggable);
gsap.registerPlugin(Draggable, InertiaPlugin);

function UploadBox() {
    // Zustand things
    const insertImage = useDataStore((state) => state.insertImage);
    const removeColor = useDataStore((state) => state.removeColorArray);
    const setAnimateTrue = useDataStore((state) => state.setAnimateTrue);
    const isAnimate = useDataStore((state) => state.isAnimate);
    const warna = useDataStore((state) => state.warna);
    const image = useDataStore((state) => state.image);
    const isLoad = useDataStore((state) => state.isLoad)

    const [isLightMode, setIsLightMode] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file);

        insertImage(fileUrl);

        setAnimateTrue();

        setTimeout(() => {
            gsap.to(imageRef.current, { scaleX: 1.2, scaleY: 1.2, duration: 1, ease: "expo.inOut" });
            moveContainerUpload(isAnimate);
        }, 500);
    }

    function handleDrag(e: React.DragEvent<HTMLDivElement>) {
        const target = e.target as HTMLInputElement;
        if (!target.files || target.files.length === 0) return;

        const file = target.files[0];
        const fileUrl = URL.createObjectURL(file);

        insertImage(fileUrl);

        setAnimateTrue();

        setTimeout(() => {
            gsap.to(imageRef.current, { scaleX: 1.2, scaleY: 1.2, duration: 1, ease: "expo.inOut" });
            moveContainerUpload(isAnimate);
        }, 500);
    }

    useEffect(() => {
        setColorAnimation();
    }, []);

    useEffect(() => {
        dragImage();
        removeColor();
        if (image) {
            getVibrantColor(image);
        }
    }, [image]);

    const boxRef = useRef<HTMLDivElement>(null);

    const dragImage = () => {
        Draggable.create(imageRef.current, {
            type: "x,y",
            bounds: ".box",
            inertia: true,

            onDrag: () => {
                gsap.to(imageRef.current, {
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 0.5,
                    ease: "expo.out",
                });
            },
            onDragEnd: function () {
                gsap.to(imageRef.current, {
                    scaleX: 1.2,
                    scaleY: 1.2,
                    duration: 0.5,
                    ease: "expo.out",
                });
            },
        });
    };



    return (
        <div data-cursor-size="200px" data-cursor-exclusion className={`upload-box h-[450px] max-sm:h-[250px] w-[600px] max-md:w-full ${isLoad ? "" : "hidden"}`}>
            <div id="brand" className="mb-6">
                <h1 className="text-center leading-none text-preload font-sans max-sm:text-4xl text-6xl font-bold">
                    HexaGrab
                </h1>
                <p className="max-sm:text-base text-center text-preload font-sans text-xl font-medium opacity-60 m ">
                    Turn Images into Colors with One Upload.
                </p>
            </div>
            <div ref={boxRef} className={`box relative my-4 h-40 md:h-60 w-full ${isAnimate ? "outline" : "outline-dashed" } outline-2 rounded-xl group overflow-hidden`} style={{ outlineColor: warna[2] }}>
                <div
                    className={`absolute flex flex-col items-center justify-center gap-2 transition-all 
                     ${isAnimate ? "hidden" : "inset-0"}`}
                >
                    <IconContext.Provider value={{ className: `text-6xl ${isAnimate ? "text-[#171717] text-2xl" : "dark:text-white text-[#171717]"}` }}>
                        <IoCloudUpload />
                    </IconContext.Provider>

                    {isAnimate ? "" : (
                        <>
                            <p className="text-upload font-sans hidden md:block">Drag and drop image here</p>
                            <p className="text-upload font-sans hidden md:block">or</p>
                            <label htmlFor="image" className="text-upload md:text-blue-500 font-sans cursor-pointer">
                                Browse
                            </label>
                        </>
                    )}
                </div>
                {isAnimate ? "" : (
                    <>
                        <input type="file" accept="image/png, image/gif, image/jpeg" name="image" onDrag={handleDrag} id="image" onChange={handleChange} className="absolute z-20 inset-0 opacity-0 cursor-pointer" />
                    </>
                )}

                {image && <img ref={imageRef} src={image} alt="Uploaded" className={`w-full h-auto absolute left-0 top-0 -z-10`} />}
            </div>
        </div>
    );
}

export default UploadBox;
