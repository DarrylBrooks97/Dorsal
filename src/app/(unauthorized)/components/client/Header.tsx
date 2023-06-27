"use client"

import { HamburgerMenuIcon } from "@radix-ui/react-icons"

export default function Header() {
  return (
    <div className="flex h-[90px] w-full justify-between bg-blue-400">
      <p className="text-lg">Dorsal</p>
      <HamburgerMenuIcon className="" />
    </div>
  )
}
