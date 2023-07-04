"use client"

import { LockClosedIcon } from "@radix-ui/react-icons"
import { signIn } from "next-auth/react"

export default function SignUp() {
  const handleClick = async () => {
    await signIn("google", { callbackUrl: "http://localhost:3000/dashboard" })
  }

  return (
    <section className="flex h-full flex-col items-center justify-center space-y-1">
      <h1 className="text-2xl font-medium">Sign Up</h1>
      <div className="flex h-[80px] items-center rounded-md p-2">
        <button
          className="flex space-x-3 rounded-md bg-black p-2 text-white duration-150 ease-in-out hover:bg-gray-800"
          onClick={handleClick}
        >
          <span>
            <LockClosedIcon className="h-5 w-5" />
          </span>
          <p>Continue with Google</p>
        </button>
      </div>
    </section>
  )
}
