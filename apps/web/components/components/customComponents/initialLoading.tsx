import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

type Props = {};

function InitialLoading({}: Props) {
  const initialLoadingRef = useRef(null);

  useEffect(() => {
    const el = initialLoadingRef.current;
    gsap.set(el, {
      y: 300,
      skewY: 2,
      transformOrigin: 'center'
    });
    gsap.to(el, {
      y: 0,
      duration: 2,
      ease: 'power3.out'
    });
  }, []);

  setTimeout(() => {
    const el = initialLoadingRef.current;
    gsap.set(el, {
      y: 0,
      duration: 5,
      transformOrigin: 'center'
    })
    gsap.to(el, {
        y: -700,
        ease: 'power3.out',
    });
  }, 5000);

  return (
    <div className="absolute top-0 min-w-full min-h-screen z-[100] overflow-hidden">
      <div
        ref={initialLoadingRef}
        className="w-full bg-red-900 min-h-[100vh] flex flex-col justify-center items-center">
        <h2 className="font-black text-6xl">Something</h2>
        <h2 className="font-black text-6xl">
          Cooking <span className="animate-ping">...</span>{' '}
        </h2>
      </div>
    </div>
  );
}

export default InitialLoading;
