"use client"
import React from 'react'
import ThemeToggler from './themeToggler'
import { useClerk } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

type Props = {}

function Header({}: Props) {
    const router = useRouter();
      const { signOut } = useClerk();
      const s = async()=>{
        const result = await signOut();
        router.push('/sign-in')
        
      }

  return (
    <div className='flex justify-around items-center p-4'>
        <div className='border p-4 rounded-lg'>Imggen</div>
        <div className='flex items-center justify-between border p-4 rounded-lg'>
          <Button variant='ghost' onClick={s}>Sign out</Button>
          <ThemeToggler />
        </div>
    </div>
  )
}

export default Header