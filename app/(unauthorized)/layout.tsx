import { PropsWithChildren } from "react"

export default function UnAuthorizedRootLayout({ children }: PropsWithChildren<any>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
