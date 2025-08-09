import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Features() {
  const featuresRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!featuresRef.current) return;

    ScrollTrigger.create({
      trigger: featuresRef.current,
      start: 'top top',
      end: '+=10%',
      pin: true,
      scrub: true,
    });
  }, { scope: featuresRef });

  return (
    <div ref={featuresRef} className='w-full h-screen bg-green-800 flex items-center justify-center'>
      <h1 className='text-white text-4xl'>Pricing</h1>
    </div>
  );
}

export default Features;
