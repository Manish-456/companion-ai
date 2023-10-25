import React from 'react'

export default function ChatLayout({children} : {
    children : React.ReactNode
}) {
  return (
    <div className='mx-auto max-w-3xl h-full w-full'>
      {children}      
    </div>
  )
}
