// import Link from "next/link"
// import { useTheme } from "next-themes"

// export function SharedFooter() {
//   const { theme } = useTheme()

//   return (
//     <footer className={`border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
//       <div className="container mx-auto px-4 py-6">
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//           <div className="text-sm text-center sm:text-left">
//             © {new Date().getFullYear()} NFTVision. All rights reserved.
//           </div>
//           <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-8">
//             <Link href="/about" className="text-sm hover:underline">
//               About Us
//             </Link>
//             <Link href="/contact" className="text-sm hover:underline">
//               Contact
//             </Link>
//             <Link href="/privacy" className="text-sm hover:underline">
//               Privacy Policy
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }
"use client"

import Link from "next/link"
import { useTheme } from "next-themes"

export function SharedFooter() {
  const { theme } = useTheme()

  return (
    <footer className={`border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-center sm:text-left">
            © {new Date().getFullYear()} NFTVision. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-8">
            <Link href="/about" className="text-sm hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="text-sm hover:underline">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
