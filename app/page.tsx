"use client"

import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnect } from "@/components/wallet-connect"
import { RetroLogo } from "@/components/retro-logo"
import { useTheme } from "next-themes"
import { SharedFooter } from "@/components/shared-footer"
import { TrendingUp, Wallet, BarChart2, Layers, ShoppingBag, Menu } from "lucide-react"
import { ChevronRight } from "lucide-react"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { cn } from "@/lib/utils"
import { NeonGradientCard } from "@/components/neon-gradient-card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function Page() {
  const { authenticated } = usePrivy()
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    if (authenticated) {
      router.push("/dashboard")
    }
  }, [authenticated, router])

  const features = [
    {
      title: "NFT Market Analytics",
      description: "View comprehensive NFT market insights and trends.",
      icon: TrendingUp,
      gradientFrom: "#ff00cc",
      gradientTo: "#3333ff",
    },
    {
      title: "Token Balance",
      description: "Check your token balances across different blockchains.",
      icon: Wallet,
      gradientFrom: "#00ff87",
      gradientTo: "#60efff",
    },
    {
      title: "Token Metrics",
      description: "Explore detailed metrics for various tokens.",
      icon: BarChart2,
      gradientFrom: "#ff6b6b",
      gradientTo: "#feca57",
    },
    {
      title: "Supported Blockchains",
      description: "View information about supported blockchains.",
      icon: Layers,
      gradientFrom: "#4facfe",
      gradientTo: "#00f2fe",
    },
    {
      title: "NFT Marketplaces",
      description: "Discover marketplace insights and analytics.",
      icon: ShoppingBag,
      gradientFrom: "#fa709a",
      gradientTo: "#fee140",
    },
  ]

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Header */}
      <header className={`border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <RetroLogo />
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <ThemeToggle />
                <WalletConnect />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col space-y-4 mt-4">
                    <ThemeToggle />
                    <WalletConnect />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <AnimatedGradientText className="mb-4">
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                )}
              >
                🎉 | Introducing NFTVision
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              Unlock the World of NFTs: <span className="text-purple-500">Real-Time Insights at Your Fingertips</span>
            </h1>
            <p
              className={`text-base sm:text-lg md:text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}
            >
              Analyze NFT trends, explore top collections, track wallet performance, and get real-time price estimates.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <NeonGradientCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <SharedFooter />
    </div>
  )
}

