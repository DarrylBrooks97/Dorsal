import { HtmlHTMLAttributes } from "react"
import Image from "next/image"
import { cn } from "~/lib/utils"

interface OverViewItemProps extends HtmlHTMLAttributes<HTMLDivElement> {
  title: string
  value: number
}

function OverViewItem(props: OverViewItemProps) {
  return (
    <div className={cn("flex w-[50px] grow flex-col items-center space-y-3 text-white")}>
      <h2 className={cn("font-base text-2xl ", props.className)}>{props.value}</h2>
      <p className="font-base text-lg">{props.title}</p>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="flex h-full flex-col space-y-9 p-3">
      <div className="flex h-fit w-full flex-col space-y-2 ">
        <h1 className="text-2xl font-medium text-white">Overview</h1>
        <div className="flex w-full">
          <OverViewItem title="Tanks" value={2} />
          <OverViewItem title="Species" value={10} />
          <OverViewItem title="Reminders" value={2} className="text-red-500" />
        </div>
      </div>
      <div className="flex w-full flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium text-white">
            Next Reminder
            <span className="ml-3 text-lg font-normal text-gray-400"> in 2 days</span>
          </h1>
          <div className="font-light text-white hover:cursor-pointer">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex">
          <div className="relative h-[120px] w-[200px] overflow-clip rounded-md">
            <Image
              src="https://images.unsplash.com/photo-1517777170473-009c8c3734c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80"
              alt="reminder-image"
              fill
              className="object-cover"
            />
          </div>
          <div className="ml-2 flex grow flex-col p-1 text-white ">
            <p className="text-xl">Living room tank</p>
            <p className="">Feed fish</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-medium text-white">Recommendations</h1>
        <div className="flex">
          <div className="relative h-[120px] w-[200px] overflow-clip rounded-md">
            <Image
              src="https://images.unsplash.com/photo-1615988506550-20d485e6aaa0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80"
              alt="reminder-image"
              fill
              className="object-cover"
            />
          </div>
          <div className="ml-2 flex grow flex-col justify-between p-1 text-white ">
            <p className="text-xl">Fresh water tanks</p>
            <div className="flex items-center space-x-2 font-light">
              <p className="text-lg">by</p>
              <div className="relative h-[20px] w-[20px] overflow-clip rounded-full">
                <Image
                  src="https://images.unsplash.com/photo-1615988506550-20d485e6aaa0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80"
                  alt="reminder-image"
                  fill
                  className="object-cover"
                />
              </div>
              <p>@psherman42</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
