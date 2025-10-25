'use client'

import { SignIn, useUser } from '@clerk/nextjs'
import ChatComponent from "./components/chat"

export default function Home() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) {
    return <SignIn />
  }

  return (
    <ChatComponent />
  );
}