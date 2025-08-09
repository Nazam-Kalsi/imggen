"use client";
import { useAuth } from "@clerk/nextjs";
import { Features, Footer, HeroSection, InitialLoading, Pricing } from "@components/components/customComponents";
import { useRouter } from "next/navigation";

export default function Home() {
  const router =useRouter();
  const {isSignedIn} = useAuth();
  if(isSignedIn){
    router.push('/image-generation')
  }
  return(
    <>
    {/* <InitialLoading/> */}
    <HeroSection/>
    <Pricing/>
    <Features/>
    <Footer/>
    </>
  )
}
