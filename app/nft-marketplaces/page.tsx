"use client"

import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getNFTMarketplaceMetadata } from "@/utils/api"
import { Loader2 } from "lucide-react"
import Image from "next/image"

interface Marketplace {
  blockchain: string
  chain_id: number
  contract_address: string
  external_url: string
  image_url: string
  marketplaces: string
}

export default function NFTMarketplacesPage() {
  const { authenticated } = usePrivy()
  const router = useRouter()
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authenticated) {
      router.push("/")
    } else {
      fetchData()
    }
  }, [authenticated, router])

  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await getNFTMarketplaceMetadata()
      setMarketplaces(data.data || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching NFT marketplace metadata:", err)
      setError("Unable to load data. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return null
  }

  return (
    <Layout showBackButton>
      <h1 className="text-4xl font-bold mb-8">NFT Marketplaces</h1>
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
          ) : marketplaces.length === 0 ? (
            <div>No marketplace data available.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Marketplace</TableHead>
                    <TableHead>Blockchain</TableHead>
                    <TableHead>Contract Address</TableHead>
                    <TableHead>Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketplaces.map((marketplace, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Image
                          src={marketplace.image_url || "/placeholder.svg"}
                          alt={marketplace.marketplaces}
                          width={32}
                          height={32}
                        />
                      </TableCell>
                      <TableCell>{marketplace.marketplaces}</TableCell>
                      <TableCell>{marketplace.blockchain}</TableCell>
                      <TableCell>{marketplace.contract_address}</TableCell>
                      <TableCell>
                        {marketplace.external_url ? (
                          <a
                            href={marketplace.external_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            Visit
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  )
}

