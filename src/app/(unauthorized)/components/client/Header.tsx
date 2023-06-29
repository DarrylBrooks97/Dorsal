"use client"

import Link from "next/link"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between p-3">
      <Link href="/" passHref>
        <p className="text-2xl font-semibold">Dorsal</p>
      </Link>
      <HamburgerMenuIcon className="h-5 w-5" />
    </header>
  )
}
