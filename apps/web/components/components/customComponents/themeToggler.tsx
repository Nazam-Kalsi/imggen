"use client"
import { LucideMoon, SunDim } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';

type Props = {}

function ThemeToggler({}: Props) {
    const [theme, setTheme] = useState('dark');
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
        document.documentElement.classList.toggle('dark');
    };
    useEffect(()=>{
        toggleTheme();
    },[])
  return (    
      <Button variant='ghost' onClick={toggleTheme}>{theme !== 'dark' ? <SunDim/> : <LucideMoon/>}</Button>
  )
}

export default ThemeToggler