"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { useTheme } from "next-themes"

interface NeonGradientCardProps {
  title: string
  description: string
  icon: LucideIcon
  gradientFrom: string
  gradientTo: string
}

export function NeonGradientCard({ title, description, icon: Icon, gradientFrom, gradientTo }: NeonGradientCardProps) {
  const { theme } = useTheme()

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all hover:shadow-2xl",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        theme === "dark" ? "bg-gray-900" : "bg-white",
      )}
    >
      <div
        className={cn("absolute inset-0", theme === "dark" ? "opacity-20" : "opacity-10")}
        style={{
          background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo})`,
        }}
      />
      <CardHeader className="relative">
        <div
          className={cn(
            "mb-2 flex h-12 w-12 items-center justify-center rounded-full",
            theme === "dark" ? "bg-white/10" : "bg-gray-100",
          )}
        >
          <Icon className={cn("h-6 w-6", theme === "dark" ? "text-white" : "text-gray-800")} />
        </div>
        <CardTitle className={cn("text-xl font-bold", theme === "dark" ? "text-white" : "text-gray-800")}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <p className={cn("text-sm", theme === "dark" ? "text-gray-300" : "text-gray-600")}>{description}</p>
      </CardContent>
    </Card>
  )
}

