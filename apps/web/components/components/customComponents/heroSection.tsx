import React from 'react'
import { AnimatedGradientText } from '../ui/animated-gradient-text'
import { ChevronRight } from 'lucide-react'
import Noise from './noise'



function HeroSection() {
  return (
    <div className='w-full min-h-[222vh]'>
    <img
        src={`./grad1.svg`}
        alt="svg"
        width={500}
        height={500}
        className="absolute object-cover inset-0 size-full opacity-40 hidden dark:block"
      />
       <img
        src={`./grad5.jpeg`}
        alt="svg"
        width={500}
        height={500}
        className="absolute object-cover inset-0 size-full opacity-40 blur-sm block dark:hidden"
      />
     <Noise/>
      <div className="h-[84vh] flex flex-col justify-center items-center">
        <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
      <span
        className="absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />
      ✨  <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
      <AnimatedGradientText className="text-sm font-medium">Introducing Imggen</AnimatedGradientText>
      <ChevronRight
        className="ml-1 size-4 stroke-neutral-500 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5"
      />
    </div>
        <div className="w-3/4 text-center flex flex-col items-center justify-center">
          <h2 className="text-[5.6rem] text-center font-bold leading-24">
            Transform Your Photos with &nbsp;
            <span className="text-violet-600 relative z-[99]">AI MAGIC</span>
          </h2>
          <p className="mt-3">
            Create stunning visuals with just few clicks.
          </p>
          {/* <button className="relative z-[2] group flex justify-center items-center">Get started
            <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:scale-115 group-hover:stroke-violet-300"/>
          </button> */}
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection