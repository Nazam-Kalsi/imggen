import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function InitialLoading() {
  gsap.registerPlugin(useGSAP);
  const initialLoadingRef = useRef(null);

  // Initial entrance animation
  // useGSAP(() => {
  //   const el = initialLoadingRef.current;
  //   gsap.set(el, {
  //     y: 0,
  //     skewY: 2,
  //     transformOrigin: 'center'
  //   });
  //   gsap.to(el, {
  //     y: 0,
  //     duration: 2,
  //     ease: 'power3.out'
  //   });
  // }, { scope: initialLoadingRef });

  // Exit animation after 5s
  useEffect(() => {
    const timeout = setTimeout(() => {
      const el = initialLoadingRef.current;
      gsap.to(el, {
        y: -700,
        ease: 'power3.out',
        duration: 3,
      });
    }, 3000);

    // Cleanup
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="absolute top-0 min-w-full min-h-screen z-[100] overflow-hidden">
      <div
        ref={initialLoadingRef}
        className="w-full bg-red-900 min-h-[100vh] flex flex-col justify-center items-center skew-y-2">
        <h2 className="font-black text-6xl">Something</h2>
        <h2 className="font-black text-6xl">
          Cooking <span className="animate-ping">...</span>
        </h2>
      </div>
    </div>
  );
}

export default InitialLoading;
