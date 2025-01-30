// pages/nft-portfolio/page.tsx
"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNFTPortfolio } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NFT {
  blockchain: string;
  collection: string;
  token_id: string;
  contract_address: string;
  token_name: string;
  token_symbol: string;
  quantity: number;
}

export default function NFTPortfolioPage() {
  const { authenticated, user } = usePrivy();
  const router = useRouter();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlockchain, setSelectedBlockchain] = useState("ethereum");

  useEffect(() => {
    if (!authenticated) {
      router.push("/");
    } else {
      fetchData();
    }
  }, [authenticated, selectedBlockchain, router]);

  const fetchData = async () => {
    try {
      if (!user?.wallet?.address) return;
      setLoading(true);
      const data = await getNFTPortfolio(user.wallet.address, selectedBlockchain);
      setNfts(data?.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching NFT portfolio:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout showBackButton>
      <h1 className="text-4xl font-bold mb-6">Your NFT Portfolio</h1>

      {/* Blockchain Selector */}
      <div className="mb-6">
        <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select Blockchain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ethereum">Ethereum</SelectItem>
            <SelectItem value="polygon">Polygon</SelectItem>
            <SelectItem value="avalanche">Avalanche</SelectItem>
            <SelectItem value="linea">Linea</SelectItem>
            <SelectItem value="binance">Binance</SelectItem>
            <SelectItem value="bitcoin">Bitcoin</SelectItem>
            <SelectItem value="solana">Solana</SelectItem>
            <SelectItem value="unichain_sepolia">Unichain Sepolia</SelectItem>
            <SelectItem value="atleta_olympia">Atleta Olympia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Display NFT Portfolio */}
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading your NFTs...</span>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : nfts.length === 0 ? (
        <div>No NFTs found in your portfolio.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nfts.map((nft, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{nft.token_symbol}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Collection:</strong> {nft.collection}</p>
                <p><strong>Token ID:</strong> {nft.token_id}</p>
                <p><strong>Quantity:</strong> {nft.quantity}</p>
                <p>
                  <strong>Contract Address:</strong>{" "}
                  <a href={`https://etherscan.io/address/${nft.contract_address}`} target="_blank" rel="noopener noreferrer">
                    {nft.contract_address.slice(0, 10)}...
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
