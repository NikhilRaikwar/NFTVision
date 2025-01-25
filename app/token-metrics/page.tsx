"use client"

import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTokenMetrics } from "@/utils/api"
import { Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TokenMetrics {
  blockchain: string
  chain_id: number
  circulating_supply: number
  current_price: number
  market_cap: number | null
  token_address: string
  token_name: string
  token_symbol: string
  total_supply: number
  volume_24h: number
  token_score: number | null
}

export default function TokenMetricsPage() {
  const { authenticated } = usePrivy()
  const router = useRouter()
  const [tokenMetrics, setTokenMetrics] = useState<TokenMetrics[]>([])
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
      const data = await getTokenMetrics()
      setTokenMetrics(data.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching token metrics:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return null
  }

  return (
    <Layout showBackButton>
      <h1 className="text-4xl font-bold mb-8">Token Metrics</h1>
      <Card>
        <CardHeader>
          <CardTitle>Detailed Token Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading token metrics...</span>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : tokenMetrics.length === 0 ? (
            <div>No token metrics available.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Blockchain</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Market Cap</TableHead>
                    <TableHead>24h Volume</TableHead>
                    <TableHead>Circulating Supply</TableHead>
                    <TableHead>Total Supply</TableHead>
                    <TableHead>Token Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokenMetrics.map((token, index) => (
                    <TableRow key={index}>
                      <TableCell>{token.token_symbol}</TableCell>
                      <TableCell>{token.token_name}</TableCell>
                      <TableCell>{token.blockchain}</TableCell>
                      <TableCell>${token.current_price?.toFixed(2) ?? "N/A"}</TableCell>
                      <TableCell>${token.market_cap?.toLocaleString() ?? "N/A"}</TableCell>
                      <TableCell>${token.volume_24h?.toLocaleString() ?? "N/A"}</TableCell>
                      <TableCell>{token.circulating_supply?.toLocaleString() ?? "N/A"}</TableCell>
                      <TableCell>{token.total_supply?.toLocaleString() ?? "N/A"}</TableCell>
                      <TableCell>{token.token_score?.toFixed(2) ?? "N/A"}</TableCell>
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

