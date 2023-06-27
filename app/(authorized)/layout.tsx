import { PropsWithChildren } from "react"

export default function AuthorizedRootLayout({ children }: PropsWithChildren<any>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
