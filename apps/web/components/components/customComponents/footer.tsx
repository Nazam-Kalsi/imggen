import React from 'react'
import { TextHoverEffect } from "@components/components/ui/text-hover-effect";

type Props = {}

function Footer({}: Props) {
  return (
    <div className='relative '>
        <TextHoverEffect text="IMGGEN" />
        <div className='flex w-full px-10 justify-end items-center absolute top-3/4'>
            <p>made with ❤️ </p>
            
        </div>
            

    </div>
  )
}

export default Footer