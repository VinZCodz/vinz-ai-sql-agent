'use client'

import { SignIn, UserButton, useUser } from '@clerk/nextjs'
import ChatComponent from "./components/chat"

export default function Home() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) {
    return <SignIn />
  }

  return (
    <div className='min-screen-height'>

      <span className="fixed top-2 right-2 px-4 z-50">
        <UserButton />
      </span>

      <ChatComponent />
      
    </div>
  );
}