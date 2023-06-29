"use client"

import { signIn } from "next-auth/react"

export default function SignUp() {
  const handleClick = async () => {
    await signIn("google", { callbackUrl: "http://localhost:3000" })
  }

  return (
    <div className="h-full">
      <h1>Sign Up</h1>
      <button className="rounded-md p-2 text-white" onClick={handleClick}>
        Sign up with Google
      </button>
    </div>
  )
}
