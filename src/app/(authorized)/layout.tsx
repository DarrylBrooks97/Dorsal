import { PropsWithChildren } from "react"

import "~/styles/globals.css"

import { Inter } from "next/font/google"
import { cn } from "~/lib/utils"

import Header from "../(unauthorized)/components/client/Header"

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
      className={cn("min-w-screen flex min-h-screen max-w-7xl flex-col", inter.className)}
    >
      <body className="bg-dark p-1">
        <Header />
        <main className="grow">{children}</main>
      </body>
    </html>
  )
}
