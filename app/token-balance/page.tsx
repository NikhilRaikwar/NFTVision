"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTokenBalance, blockchainExplorerLinks } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TokenBalance {
  token_symbol: string;
  token_name: string;
  blockchain: string;
  balance: string;
  token_address: string;
}

export default function TokenBalancePage() {
  const { authenticated, user } = usePrivy();
  const router = useRouter();
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
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
      if (!user?.wallet?.address) return;
      setLoading(true);
      const data = await getTokenBalance(user.wallet.address, selectedBlockchain);
      setTokenBalances(data?.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching token balances:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Filter tokens based on search query
  const filteredTokens = tokenBalances.filter(
    (token) =>
      token.token_symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.token_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!authenticated) {
    return null;
  }

  return (
    <Layout showBackButton>
      <h1 className="text-4xl font-bold mb-6">Token Balance</h1>

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
          <span>Loading token balances...</span>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : filteredTokens.length === 0 ? (
        <div>No token balances found for {selectedBlockchain}.</div>
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
                  <strong>Balance:</strong> {token.balance}
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
