"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

export default function AboutPage() {
  const { authenticated } = usePrivy();
  const router = useRouter();



  const features = [
    {
      title: "📊 NFT Market Analytics",
      description: [
        "View comprehensive NFT market insights and trends",
        "Real-time market trends and insights",
        "Price history and volume analysis",
        "Collection rankings and statistics",
        "Market sentiment indicators",
        "Custom analytics dashboards",
      ],
    },
    {
      title: "💰 Token Balance Tracker",
      description: [
        "Check your token balances across different blockchains",
        "Multi-chain token balance monitoring",
        "Portfolio value tracking",
        "Historical balance changes",
        "Support for major blockchains",
        "Real-time balance updates",
      ],
    },
    {
      title: "📈 Token Metrics",
      description: [
        "Explore detailed metrics for various tokens",
        "Detailed token performance metrics",
        "Price charts and volume analysis",
        "Market cap tracking",
        "Trading volume indicators",
        "Historical price data",
      ],
    },
    {
      title: "⛓️ Supported Blockchains",
      description: [
        "Ethereum",
        "Polygon",
        "Binance Smart Chain",
        "Solana",
        "Additional chains being added regularly",
      ],
    },
    {
      title: "🏪 NFT Marketplaces",
      description: [
        "Cross-marketplace price comparison",
        "Sales history tracking",
        "Listing analytics",
        "Market dominance metrics",
        "Real-time price updates",
      ],
    },
    {
      title: "💼 NFT Portfolio",
      description: ["View your NFT portfolio across different blockchains"],
    },
    {
      title: "🔍 NFT Transactions",
      description: ["Track the latest NFT transactions in real-time"],
    },
    {
      title: "🧼 NFT Wash Trades",
      description: ["View wash trade trends across different marketplaces"],
    },
    {
      title: "🔒 Security & Authentication",
      description: [
        "Secure Web3 authentication through Privy",
        "MetaMask, WalletConnect, Coinbase Wallet, Rainbow Wallet, Trust Wallet, and more",
      ],
    },
  ];

  return (
    <Layout showBackButton>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

        {/* Mission and Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Welcome to NFTVision, your premier destination for comprehensive NFT analytics and insights. We are
              dedicated to providing real-time data and analysis to help you navigate the dynamic world of NFTs and
              digital assets.
            </p>
            <p>
              Our platform combines cutting-edge technology with user-friendly interfaces to deliver accurate, timely,
              and actionable insights across multiple blockchains and marketplaces.
            </p>
          </CardContent>
        </Card>

        {/* Overview Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              NFTVision is a comprehensive NFT market analytics platform built with Next.js and TypeScript. It provides
              real-time insights and detailed metrics for NFT markets across multiple blockchains, helping users make
              informed decisions in the NFT space. The platform leverages the powerful UnleashNFTs API (
              <a href="https://www.unleashnfts.com/" target="_blank" className="text-blue-500 hover:underline">
                UnleashNFTs API
              </a>
              ) for comprehensive NFT data and analytics.
            </p>
            <h3 className="text-xl font-semibold mt-6">🏆 Achievements</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Participated in the bitsCrunch Hackathon: "Unlocking the Future with Web3 Data"</li>
              <li>Successfully integrated UnleashNFTs API for enhanced market analytics</li>
              <li>
                View our hackathon submission:{" "}
                <a
                  href="https://dorahacks.io/buidl/22019"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  bitsCrunch Hackathon
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Key Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-4 shadow-lg rounded-xl transition-transform transform hover:scale-105">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  {feature.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
