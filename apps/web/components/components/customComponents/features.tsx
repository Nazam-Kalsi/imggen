import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react'
import gsap from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';


function Pricing() {
      gsap.registerPlugin(ScrollTrigger);
    const pricingRef = useRef<HTMLDivElement>(null);
    useGSAP(()=>{
        if(!pricingRef.current)return;
        const container = pricingRef.current.querySelector('.pricing-container');
        gsap.fromTo(container,
             { yPercent:0},
          {
            yPercent: -100,
            ease: 'none',
            scrollTrigger: {
              trigger: pricingRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        )
    },{scope:pricingRef})
  return (
    <div ref={pricingRef} className='relative z-[100] flex w-full justify-center items-center'>
        <div className='absolute top-0 pricing-container w-full h-screen bg-red-900'>
          Features
        </div>
    </div>
  )
}

export default Pricing