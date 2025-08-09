import React, { useRef } from 'react';
import { AnimatedGradientText } from '../ui/animated-gradient-text';
import { ChevronRight } from 'lucide-react';
import Noise from './noise';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

function HeroSection() {
  gsap.registerPlugin(ScrollTrigger);
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if(!heroRef.current)return;
      
      const image = heroRef.current.querySelectorAll('.bg-image');
      const gradientText = heroRef.current.querySelector('.gradient-text-container');
      const mainText = heroRef.current.querySelector('.main-text-container');

      // image.forEach((img) => {
      //   gsap.fromTo(
      //     img,
      //     { yPercent: 8 },
      //     {
      //       yPercent: -10,
      //       ease: 'none',
      //       scrollTrigger: {
      //         trigger: heroRef.current,
      //         start: 'top bottom',
      //         end: 'bottom top',
      //         scrub: true
      //       }
      //     }
      //   );
      // });

      gsap.fromTo(
        gradientText,
        { yPercent: 30 },
        {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      gsap.fromTo(
        mainText,
        { yPercent: 50 },
        {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    },
    { scope: heroRef }
  );

  return (
    <div className="w-full min-h-[90vh]" ref={heroRef}>
      <img
        src={`./grad1.svg`}
        alt="svg"
        width={520}
        height={520}
        className="bg-image absolute object-cover inset-0 size-full opacity-40 hidden dark:block translate-y-0 will-change-transform"
      />
      <img
        src={`./grad5.jpeg`}
        alt="svg"
        width={500}
        height={500}
        className="bg-image absolute object-cover inset-0 size-full opacity-40 blur-sm block dark:hidden translate-y-0 will-change-transform"
      />
      <div className="h-[84vh] flex flex-col justify-center items-center">
      <Noise />
        <div className="gradient-text-container group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] translate-y-0 will-change-transform">
          <span
            className="absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
            style={{
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'destination-out',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'subtract',
              WebkitClipPath: 'padding-box'
            }}
          />
          ✨ <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
          <AnimatedGradientText className="text-sm font-medium">Introducing Imggen</AnimatedGradientText>
          <ChevronRight
            className="ml-1 size-4 stroke-neutral-500 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5"
          />
        </div>
        <div className="main-text-container w-3/4 text-center flex flex-col items-center justify-center translate-y-0 will-change-transform">
          <h2 className="text-[5.6rem] text-center font-bold leading-24">
            Transform Your Photos with &nbsp;
            <span className="text-violet-600 relative z-[99]">AI MAGIC</span>
          </h2>
          <p className="mt-3">Create stunning visuals with just few clicks.</p>
          {/* <button className="relative z-[2] group flex justify-center items-center">Get started
            <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:scale-115 group-hover:stroke-violet-300"/>
          </button> */}
        </div>
      </div>
      {/* <div className='bg-image shadow-[0_10px_30px_30px_#000000] z-[99999] relative'/> */}
    </div>
  );
}

export default HeroSection;

