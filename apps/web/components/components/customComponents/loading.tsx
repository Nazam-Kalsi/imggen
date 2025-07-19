import React from 'react'
import { Mirage } from 'ldrs/react'
import 'ldrs/react/Mirage.css'

type Props = {}

function Loading({}: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
      <Mirage
        size="100"
        speed="2.5"
        color="white"
      />
    </div>
  )
}

export default Loading
