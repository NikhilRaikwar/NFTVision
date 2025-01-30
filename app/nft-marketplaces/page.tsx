"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNFTMarketplaceMetadata, blockchainExplorerLinks } from "@/utils/api";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Marketplace {
  blockchain: string;
  chain_id: number;
  contract_address: string;
  external_url: string;
  image_url: string;
  marketplaces: string;
}

export default function NFTMarketplacesPage() {
  const { authenticated } = usePrivy();
  const router = useRouter();
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!authenticated) {
      router.push("/");
    } else {
      fetchData();
    }
  }, [authenticated, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getNFTMarketplaceMetadata();
      setMarketplaces(data?.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching NFT marketplace metadata:", err);
      setError("Unable to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Filter marketplaces based on search query
  const filteredMarketplaces = marketplaces.filter(
    (marketplace) =>
      marketplace.marketplaces.toLowerCase().includes(searchQuery.toLowerCase()) ||
      marketplace.blockchain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!authenticated) {
    return null;
  }

  return (
    <Layout showBackButton>
      <h1 className="text-4xl font-bold mb-6">NFT Marketplaces</h1>

      {/* Search Input */}
      <div className="mb-6">
        <Input
          placeholder="Search by Marketplace or Blockchain"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-96"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Marketplace Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading marketplace metadata...</span>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : filteredMarketplaces.length === 0 ? (
            <div>No marketplace data available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMarketplaces.map((marketplace, index) => (
                <Card key={index} className="p-4 shadow-lg rounded-xl transition-transform transform hover:scale-105">
                  <CardHeader className="flex flex-col items-center">
                    <Image
                      src={marketplace.image_url || "/placeholder.svg"}
                      alt={marketplace.marketplaces}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                    <CardTitle className="text-lg font-semibold mt-2 text-center">
                      {marketplace.marketplaces}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-500">
                      <strong>Blockchain:</strong> {marketplace.blockchain}
                    </p>

                    {/* Contract Address Section with Expand/Collapse */}
                    <p className="text-sm text-gray-500 mt-2">
                      <strong>Contract:</strong>{" "}
                      {expanded[index] ? (
                        <a
                          href={`${blockchainExplorerLinks[marketplace.blockchain] || "#"}/address/${marketplace.contract_address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline break-all"
                        >
                          {marketplace.contract_address}
                        </a>
                      ) : (
                        <>
                          <span className="truncate">
                            {marketplace.contract_address.slice(0, 10)}...
                          </span>{" "}
                          <Button
                            variant="link"
                            className="text-blue-500 hover:underline text-xs"
                            onClick={() => setExpanded({ ...expanded, [index]: true })}
                          >
                            Show More
                          </Button>
                        </>
                      )}
                    </p>

                    {/* Visit Marketplace Button */}
                    <div className="mt-4">
                      <a
                        href={marketplace.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Visit Marketplace
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
}
