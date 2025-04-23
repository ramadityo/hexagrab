"use client"

import React, { useEffect, useState } from 'react'
import useDataStore from '@/store/Store'
import ColorBox from './ColorBox';
import UploadButton from './UploadButton';
import gsap from 'gsap';
export default function FloatContainer() {
  const isAnimate = useDataStore((state) => state.isAnimate);
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    setVisible(isAnimate);
    if(isAnimate){
      gsap.to("#brand", { opacity: 0, duration: 1, ease: "power2.inOut", onComplete: () => {
          document.getElementById("brand")?.classList.add("hidden");
      }});
    }
  }, [isAnimate])
  return (
    <div className={`${visible ? '' : 'hidden' } absolute inset-0 flex max-sm:flex-col gap-10 items-center justify-between p-10 z-30`}>
        <div className='image-ct flex-1 max-sm:w-full h-full rounded-xl relative'>
          <UploadButton />
        </div>
        <div className='flex-1 max-sm:w-full h-full'>
          <ColorBox />
        </div>
    </div>
  )
}
