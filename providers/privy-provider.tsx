"use client"

import { PrivyProvider } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"

export function PrivyClientProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      onSuccess={() => router.push("/dashboard")}
      config={{
        loginMethods: ["wallet", "email", "google"],
        appearance: {
          theme: "dark",
          accentColor: "#8B5CF6",
          logo: "", // Replace with your actual logo URL
          showWalletLoginFirst: "true", // Changed to string
          defaultWallet: "metamask",
          walletList: ["metamask", "coinbase_wallet", "wallet_connect"], // Specify supported wallets
          variables: {
            colorBackground: "var(--background)",
            colorInputBackground: "var(--input)",
            colorInputBorder: "var(--border)",
            colorText: "var(--foreground)",
            colorTextSecondary: "var(--muted-foreground)",
            fontFamily: "'Press Start 2P', system-ui",
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}

