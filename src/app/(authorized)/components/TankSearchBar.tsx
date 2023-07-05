"use client"

import { useEffect, useState } from "react"
import { Input } from "~/components/ui/input"

interface TankSearchBarProps {
  tanks: any[]
}

export default function TankSearchBar({ tanks }: TankSearchBarProps) {
  const [_filteredTanks, setFilteredTanks] = useState(tanks)

  useEffect(() => {
    setFilteredTanks(tanks)
  }, [tanks])

  const handleSearch = (e: any) => {
    e.preventDefault()
    const filtered = tanks.filter((tank) => {
      return tank.title.toLowerCase().includes(e.target.value.toLowerCase())
    })

    setFilteredTanks(filtered)
  }

  return <Input placeholder="Search tanks" onChange={handleSearch} />
}
