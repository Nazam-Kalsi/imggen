"use client"
import React, { useEffect, useState } from 'react'
import ThemeToggler from './themeToggler'
import { useClerk } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from 'app/store/store'
import { logedOut } from 'app/store/user.slice'



function Header() {
const dispatch = useAppDispatch();
const router = useRouter();

const isUser = useAppSelector((state) => state.authSlice.user);
const btns = [
  {
    name: "Image Generation",
    href: "/image-generation",
  },
  {
    name: "Train Model",
    href: "/train",
  },
  {
    name: "Packs",
    href: "/prompts",
  },
  {
    name: "Home",
    href: `/home/${isUser?.data?.id}`,
  },
];
      const { signOut } = useClerk();
      const s = async()=>{
        const result = await signOut();
        dispatch(logedOut());
        router.push('/sign-in');     
      }

   const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        // scrolling down
        setShowHeader(false);
      } else {
        // scrolling up
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (

    <div
      className={`fixed top-0 left-0 right-0 z-50 border w-11/12 mx-auto rounded-lg transition-transform duration-300 ${
        showHeader ? "translate-y-4" : "-translate-y-full"
      }  border-b shadow  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10`}
    >
      
      <div className="flex justify-between items-center p-2 w-full mx-auto rounded-md">
        <Link href="/" className="py-2 px-4 rounded-lg">
          Imggen
        </Link>


        <div className="flex items-center justify-between py-2 px-4 gap-2 rounded-lg">
          {isUser ? (
            <>
            {
              btns.map((btn, index) => (
                <Link key={index} href={btn.href}>
                  <Button variant="ghost">{btn.name}</Button>
                </Link>
              ))
            }
            <button  className="hover:bg-red-500/40 p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50  outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" onClick={s}>
              Sign-out
            </button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button variant="ghost">Sign in</Button>
            </Link>
          )}
          <ThemeToggler />
        </div>
        
      </div>
    </div>
    
  )
}

export default Header