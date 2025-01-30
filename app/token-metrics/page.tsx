"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTokenMetrics, blockchainExplorerLinks } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TokenMetrics {
  blockchain: string;
  chain_id: number;
  circulating_supply: number;
  current_price: number;
  market_cap: number | null;
  token_address: string;
  token_name: string;
  token_symbol: string;
  total_supply: number;
  volume_24h: number;
  token_score: number | null;
}

export default function TokenMetricsPage() {
  const { authenticated } = usePrivy();
  const router = useRouter();
  const [tokenMetrics, setTokenMetrics] = useState<TokenMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
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
      setLoading(true);
      const data = await getTokenMetrics(selectedBlockchain);
      setTokenMetrics(data?.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching token metrics:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Filter tokens based on search query
  const filteredTokens = tokenMetrics.filter(
    (token) =>
      (token.token_symbol?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
      (token.token_name?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
  )
  

  return (
    <Layout showBackButton>
      <h1 className="text-4xl font-bold mb-6">Token Metrics</h1>

      {/* Blockchain Selector & Search Input */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Select Blockchain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ethereum">Ethereum</SelectItem>
            <SelectItem value="polygon">Polygon</SelectItem>
            <SelectItem value="avalanche">Avalanche</SelectItem>
            <SelectItem value="linea">Linea</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search by Token Name or Symbol"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading token metrics...</span>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : filteredTokens.length === 0 ? (
        <div>No token metrics found for {selectedBlockchain}.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTokens.map((token, index) => (
            <Card key={index} className="p-4 shadow-lg rounded-xl transition-transform transform hover:scale-105">
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-lg font-semibold text-center">{token.token_symbol}</CardTitle>
                <p className="text-sm text-gray-500">{token.token_name}</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-500">
                  <strong>Blockchain:</strong> {token.blockchain}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Current Price:</strong> ${token.current_price?.toFixed(2) ?? "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Market Cap:</strong> ${token.market_cap?.toLocaleString() ?? "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>24h Volume:</strong> ${token.volume_24h?.toLocaleString() ?? "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Circulating Supply:</strong> {token.circulating_supply?.toLocaleString() ?? "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Total Supply:</strong> {token.total_supply?.toLocaleString() ?? "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Token Contract:</strong>{" "}
                  <a
                    href={`${blockchainExplorerLinks[token.blockchain] || "#"}/address/${token.token_address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline break-all"
                  >
                    {token.token_address.slice(0, 10)}...
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
