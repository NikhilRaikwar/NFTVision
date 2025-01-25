import "@/styles/globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { PrivyClientProvider } from "@/providers/privy-provider"

export const metadata: Metadata = {
  title: "NFTVision",
  description: "Unlock the World of NFTs: Real-Time Insights at Your Fingertips",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body>
        <PrivyClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </PrivyClientProvider>
      </body>
    </html>
  )
}



import './globals.css'