"use client"
import React from 'react'
import useDataStore from '@/store/Store'
import { moveContainerUpload } from '@/utils/animation'

export default function Helpers() {

  return (
    <div className='absolute top-10 right-10 z-50'>
      <button className='p-6 bg-white rounded-full text-black cursor-pointer' onClick={() => moveContainerUpload()}>
        Animate!
      </button>
    </div>
  )
} 
