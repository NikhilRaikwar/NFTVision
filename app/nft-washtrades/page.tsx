"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { getWashTradeData } from "@/utils/api";  // Make sure this import is correct

// Interface for wash trade data
interface WashTrade {
  blockchain: string;
  chain_id: number;
  id: string;
  name: string;
  thumbnail_url: string;
  url: string;
  washtrade_assets: string;
  washtrade_suspect_sales: string;
  washtrade_suspect_transactions: string;
  washtrade_volume: string;
  washtrade_wallets: string;
}

export default function WashTradesPage() {
  const { authenticated } = usePrivy();
  const router = useRouter();
  const [washTrades, setWashTrades] = useState<WashTrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlockchain, setSelectedBlockchain] = useState("ethereum");

  // Fetch wash trade data when the page is loaded or when the selectedBlockchain changes
  useEffect(() => {
    if (!authenticated) {
      router.push("/");
    } else {
      fetchWashTradeData();
    }
  }, [authenticated, router, selectedBlockchain]);

  // Function to fetch wash trade data for the selected blockchain
  const fetchWashTradeData = async () => {
    try {
      setLoading(true);
      const data = await getWashTradeData(selectedBlockchain);
      setWashTrades(data.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching wash trade data:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // If not authenticated, return null
  if (!authenticated) {
    return null;
  }

  return (
    <Layout showBackButton>
      <h1 className="text-4xl font-bold mb-8">NFT Marketplace Wash Trades</h1>

      {/* Blockchain Selector */}
      <div className="mb-6">
        <select
          value={selectedBlockchain}
          onChange={(e) => setSelectedBlockchain(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
          <option value="avalanche">Avalanche</option>
          <option value="linea">Linea</option>
          <option value="binance">Binance Smart Chain</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="solana">Solana</option>
        </select>
      </div>

      {/* Display Wash Trade Data */}
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading wash trade data...</span>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : washTrades.length === 0 ? (
        <div>No wash trade data found for {selectedBlockchain}.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {washTrades.map((washTrade, index) => (
            <Card
              key={index}
              className="p-4 shadow-lg rounded-xl transition-transform transform hover:scale-105"
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Image
                    src={washTrade.thumbnail_url || "/placeholder.svg"}
                    alt={washTrade.name}
                    width={40}
                    height={40}
                    className="mr-2"
                  />
                  {washTrade.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Blockchain:</strong> {washTrade.blockchain}
                </p>
                <p>
                  <strong>Wash Trade Assets:</strong> {washTrade.washtrade_assets}
                </p>
                <p>
                  <strong>Suspect Sales:</strong> {washTrade.washtrade_suspect_sales}
                </p>
                <p>
                  <strong>Suspect Transactions:</strong> {washTrade.washtrade_suspect_transactions}
                </p>
                <p>
                  <strong>Wash Trade Volume:</strong> {washTrade.washtrade_volume}
                </p>
                <p>
                  <strong>Wash Trade Wallets:</strong> {washTrade.washtrade_wallets}
                </p>
                {/* Direct link to marketplace */}
                <p>
                  <strong>Marketplace URL:</strong>{" "}
                  <a
                    href={washTrade.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {washTrade.url}
                  </a>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
}
