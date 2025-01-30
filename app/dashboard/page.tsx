// dashboard.tsx
"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function DashboardPage() {
  const { authenticated, user } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      router.push("/");
    }
  }, [authenticated, router]);

  if (!authenticated) {
    return null;
  }

  const features = [
    {
      title: "NFT Market Analytics",
      description: "View comprehensive NFT market insights and trends.",
      link: "/nft-market-analytics",
    },
    {
      title: "Token Balance",
      description: "Check your token balances across different blockchains.",
      link: "/token-balance",
    },
    {
      title: "Token Metrics",
      description: "Explore detailed metrics for various tokens.",
      link: "/token-metrics",
    },
    {
      title: "Supported Blockchains",
      description: "View information about supported blockchains.",
      link: "/supported-blockchains",
    },
    {
      title: "NFT Marketplaces",
      description: "Discover marketplace insights and analytics.",
      link: "/nft-marketplaces",
    },
    {
      title: "NFT Transactions",
      description: "Explore the latest NFT transactions across blockchains.",
      link: "/nft-transactions",
    },
    // Add NFT Portfolio feature
    {
      title: "NFT Portfolio",
      description: "View your NFT portfolio across different blockchains.",
      link: "/nft-portfolio",
    },

    {
      title: "NFT Wash Trades",
      description: "View wash trade trends across different marketplaces.",
      link: "/nft-washtrades",
    }
  ];

  return (
    <Layout>
      <div className="mb-8">
        <BlurFade delay={0.25} inView>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter">
            Welcome, {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)} 👋
          </h2>
        </BlurFade>
        <BlurFade delay={0.5} inView>
          <span className="text-pretty text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-tighter">
            Explore your NFT insights
          </span>
        </BlurFade>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
              <CardDescription className="text-sm sm:text-base">{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={feature.link}>
                <Button className="w-full">Go to {feature.title} →</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
