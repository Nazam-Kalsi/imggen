"use client"
import React, { useEffect, useState } from 'react'
import ThemeToggler from './themeToggler'
import { useClerk } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from 'app/store/store'
import { logedOut } from 'app/store/user.slice'

type Props = {}

function Header({}: Props) {
const dispatch = useAppDispatch();
const isUser = useAppSelector((state) => state.authSlice.user);

    const router = useRouter();
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

        <div className="flex items-center justify-between py-2 px-4 rounded-lg">
          {isUser ? (
            <Button variant="ghost" onClick={s}>
              Sign out
            </Button>
          ) : (
            <Link href="/sign-in">
              <Button variant="ghost">Sign in</Button>
            </Link>
          )}
          <ThemeToggler />
        </div>
      </div>
    </div>)
}

export default Header