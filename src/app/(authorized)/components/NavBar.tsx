"use client"

import { useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "~/lib/utils"
import { motion } from "framer-motion"

const tabs = [
  {
    name: "Tanks",
    path: "/tanks",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Reminders",
    path: "/reminders",
  },
]

export default function NavBar() {
  const segment = usePathname()
  const activeIndex = useMemo(() => {
    return tabs.findIndex((tab) => tab.path.includes(segment))
  }, [segment])

  return (
    <div className="absolute bottom-10 left-1/2 flex h-[60px] w-5/6 -translate-x-1/2 transform items-center justify-evenly rounded-[10px] bg-[#343434] bg-opacity-80 backdrop-blur-sm">
      {tabs.map((tab, idx) => (
        <Link href={`${tab.path}`} passHref key={tab.name} className=" text-white">
          {tab.name}
          {idx === activeIndex && (
            <motion.div
              layoutId="selected"
              className={cn("h-[2px] w-full cursor-pointer rounded-md bg-[#606060] text-white")}
            />
          )}
        </Link>
      ))}
    </div>
  )
}
