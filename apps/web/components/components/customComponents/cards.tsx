import Image from 'next/image'
import React from 'react'

type Props = {
    src:string,
    title:string,
    description:string,
    className?:string
}

function Cards({description,src,title,className}: Props) {
  return (
    <div className={` p-2 flex flex-col border  gap-1 overflow-hidden rounded-md ${className}`}>
        <Image
        src={src}
        height={600}
        width={300}
        alt='Image'

        className='rounded-md border'
        />
        <p className='text-xl leading-none'>{title}</p>
        <p className='text-xs text-wrap'>{description}</p>
    </div>
  )
}

export default Cards