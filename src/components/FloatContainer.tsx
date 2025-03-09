"use client"

import React, { useEffect, useState } from 'react'
import useDataStore from '@/store/Store'
import ColorBox from './ColorBox';

export default function FloatContainer() {
  const isAnimate = useDataStore((state) => state.isAnimate);
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    setVisible(isAnimate);
  }, [isAnimate])
  return (
    <div className={`${visible ? '' : 'hidden' } absolute inset-0 flex gap-10 items-center justify-between p-10 z-30`}>
        <div className='image-ct flex-1 h-full rounded-xl relative'></div>
        <div className='flex-1 h-full'>
          <ColorBox />
        </div>
    </div>
  )
}
