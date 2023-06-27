import { PropsWithChildren } from "react"
import { Metadata } from "next"

import "../../styles/globals.css"

import Header from "./components/client/Header"

export const metadata: Metadata = {
  title: "Dorsal",
  description: "A simplified way to manage your aquariums",
  viewport: "width=device-width, initial-scale=1",
  authors: [
    {
      name: "darrylbrooks97",
      url: "https://read.cv/darrylcodes",
    },
  ],
  keywords: ["aquarium", "tank", "fish", "coral", "freshwater", "saltwater", "reef"],
}

export default function UnAuthorizedRootLayout({ children }: PropsWithChildren<any>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen w-screen">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
