import { gsap } from "gsap";

import { Flip } from "gsap/Flip";
// import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Flip);

function moveContainerUpload(isAnimate: boolean) {
    const fromBox = document.querySelector(`.upload-box`) as HTMLElement;
    const toBox = document.querySelector(".image-ct") as HTMLElement;
    const box = document.querySelector(".box") as HTMLElement;
    const state = Flip.getState(box);

    const target = toBox;

    target.appendChild(box);

    Flip.fit(box, target, {
        duration: 0,
    });
    Flip.from(state, {
        duration: 1,
        ease: "expo.inOut",
        willChange: "transform",
        absolute: true,

        onComplete: () => {
            if (!isAnimate){
                setColorAnimation();
                initColorAnimation();
            }
            setTimeout(() => {
                box.style.width = "100%";
                box.style.height = "100%";
            }, 1);
        },
    });
}

function setColorAnimation(){
    gsap.set(".button", { scale: 1, opacity: 0 });
    gsap.set(".gradients", { scale: 0 });
    gsap.set(".copy-button", { opacity: 0, scaleX: 0});
    gsap.set(".title", {opacity: 0, yPercent: 10})
}

function initColorAnimation(){
    let tl = gsap.timeline();
    tl.to(".button", { opacity: 1, stagger: 0.1, duration: 0.5, ease: "expo.out" });
    tl.to(".copy-button", { opacity: 1, scaleX: 1, transformOrigin: "center", willChange: "transform", stagger: 0.1, duration: .5, ease: "expo.out" }, .5);
    tl.to(".title", {opacity: 1, yPercent: 0, willChange: "transform", ease: "expo.out" }, 0.5);
    tl.to(".gradients", { scale: 1, transformOrigin: "bottom center", stagger: 0.1, duration: 1, willChange: "transform", ease: "expo.inOut", onComplete: () => {
        gsap.to(".overlay-grad", {
            duration: 0.5,
            ease: "expo.out",
            autoAlpha: 0,
        })
    } }, 0.6);
}

export { moveContainerUpload, setColorAnimation, initColorAnimation };