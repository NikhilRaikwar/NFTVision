"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BlurFadeProps {
  children: React.ReactNode
  delay?: number
  inView?: boolean
  className?: string
}

export function BlurFade({ children, delay = 0, inView = true, className }: BlurFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.5, delay }}
      className={cn("will-change-[opacity,filter]", className)}
    >
      {children}
    </motion.div>
  )
}

