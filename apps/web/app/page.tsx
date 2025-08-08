"use client";
import { useAuth } from "@clerk/nextjs";
import { HeroSection, InitialLoading } from "@components/components/customComponents";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import gsap from 'gsap';

export default function Home() {
  const router =useRouter();
  const [initialLoading,setInitialLoading] = useState<boolean>(true);
  const {isSignedIn} = useAuth();
  const heroSectionRef = useRef(null);
  if(isSignedIn){
    router.push('/image-generation')
  }
  return(
    <>
    <InitialLoading/>
    <HeroSection/>
    </>
  )
}
