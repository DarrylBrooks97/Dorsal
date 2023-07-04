import { PropsWithChildren } from "react"

import "~/styles/globals.css"

import { Inter } from "next/font/google"
import { cn } from "~/lib/utils"

import Header from "../(unauthorized)/components/client/Header"
import NavBar from "./components/NavBar"

const inter = Inter({
  subsets: ["latin-ext"],
  display: "swap",
  preload: true,
})

export default function AuthorizedRootLayout({ children }: PropsWithChildren<any>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("min-w-screen flex min-h-screen max-w-7xl flex-col bg-dark", inter.className)}
    >
      <body className="flex h-full flex-col bg-inherit p-1">
        <Header />
        <main className="grow-0">{children}</main>
        <NavBar />
      </body>
    </html>
  )
}
