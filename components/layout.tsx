// import type { ReactNode } from "react"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { WalletConnect } from "@/components/wallet-connect"
// import { RetroLogo } from "@/components/retro-logo"
// import { useTheme } from "next-themes"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { useRouter } from "next/navigation"
// import { SharedFooter } from "@/components/shared-footer"
// import { Menu } from "lucide-react"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// interface LayoutProps {
//   children: ReactNode
//   showBackButton?: boolean
// }

// export function Layout({ children, showBackButton = false }: LayoutProps) {
//   const { theme } = useTheme()
//   const router = useRouter()

//   return (
//     <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
//       <header className={`border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <Link href="/">
//                 <RetroLogo />
//               </Link>
//               {showBackButton && (
//                 <Button
//                   variant="ghost"
//                   onClick={() => router.push("/dashboard")}
//                   className="ml-4 hidden md:inline-flex"
//                 >
//                   ← Back to Dashboard
//                 </Button>
//               )}
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="hidden md:flex items-center space-x-4">
//                 <ThemeToggle />
//                 <WalletConnect />
//               </div>
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="outline" size="icon" className="md:hidden">
//                     <Menu className="h-[1.2rem] w-[1.2rem]" />
//                     <span className="sr-only">Toggle menu</span>
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent>
//                   <div className="flex flex-col space-y-4 mt-4">
//                     <ThemeToggle />
//                     <WalletConnect />
//                     {showBackButton && (
//                       <Button variant="ghost" onClick={() => router.push("/dashboard")}>
//                         ← Back to Dashboard
//                       </Button>
//                     )}
//                   </div>
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

//       <SharedFooter />
//     </div>
//   )
// }

"use client"

import type { ReactNode } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnect } from "@/components/wallet-connect"
import { RetroLogo } from "@/components/retro-logo"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { SharedFooter } from "@/components/shared-footer"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface LayoutProps {
  children: ReactNode
  showBackButton?: boolean
}

export function Layout({ children, showBackButton = false }: LayoutProps) {
  const { theme } = useTheme()
  const router = useRouter()

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <header className={`border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <RetroLogo />
              </Link>
              {showBackButton && (
                <Button
                  variant="ghost"
                  onClick={() => router.push("/dashboard")}
                  className="ml-4 hidden md:inline-flex"
                >
                  ← Back to Dashboard
                </Button>
              )}
            </div>
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
                    {showBackButton && (
                      <Button variant="ghost" onClick={() => router.push("/dashboard")}>
                        ← Back to Dashboard
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

      <SharedFooter />
    </div>
  )
}