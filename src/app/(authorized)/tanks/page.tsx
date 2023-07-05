import Image from "next/image"
import { Button } from "~/components/ui/button"
import { getDate, randDate, randIdx } from "~/lib/utils"

import TankSearchBar from "../components/TankSearchBar"

const tanks = [
  {
    id: randIdx(3),
    title: "Darryl's tank",
    image:
      "https://images.unsplash.com/photo-1533713692156-f70938dc0d54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    nextUpdate: randDate().toISOString(),
  },
  {
    id: randIdx(3),
    title: "Donte's tank",
    image:
      "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=712&q=80",
    nextUpdate: randDate().toISOString(),
  },
  {
    id: randIdx(3),
    title: "Living room tank",
    image:
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    nextUpdate: randDate().toISOString(),
  },
]

function TankPreview({ tank }: any) {
  return (
    <div key={tank.id} className="flex h-[120px] w-full justify-between">
      <div className="relative h-full w-[180px] overflow-clip rounded-md">
        <Image fill alt="tank 1" className="object-cover" src={tank.image} />
      </div>
      <div className="ml-3 flex h-full flex-col text-white">
        <h1 className="text-lg font-medium">{tank.title}</h1>
        <p className="whitespace-pre-wrap">
          Next update:
          <span className="text-gray-400">{getDate(tank.nextUpdate)}</span>
        </p>
        <Button variant="secondary" className="h-fit ">
          Update
        </Button>
      </div>
    </div>
  )
}

export default function Tanks() {
  return (
    <div className="flex h-full w-full flex-col space-y-3 p-2">
      <TankSearchBar tanks={tanks} />
      <div className="flex w-full flex-col space-y-5">
        {tanks.map((tank) => (
          <TankPreview key={tank.id} tank={tank} />
        ))}
      </div>
    </div>
  )
}
