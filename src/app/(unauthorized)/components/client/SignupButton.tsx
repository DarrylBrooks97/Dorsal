"use client"

import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"

export default function SignupButton() {
  const page = useRouter()

  const handleClick = () => {
    page.push("/sign-up")
  }

  return <Button onClick={handleClick}>Get Started</Button>
}
