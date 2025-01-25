"use client"

import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDefiPortfolio, getDefiPoolMetadata } from "@/utils/api"
import { Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DefiPool {
  pool: string
  protocol: string
  token0: string
  token1: string
  pair_address: string
}

interface DefiPortfolio {
  total_value: number
  assets: Array<{
    symbol: string
    balance: number
    value: number
  }>
}

export default function DefiPortfolioPage() {
  const { authenticated, user } = usePrivy()
  const router = useRouter()
  const [defiPortfolio, setDefiPortfolio] = useState<DefiPortfolio | null>(null)
  const [defiPoolMetadata, setDefiPoolMetadata] = useState<DefiPool[]>([])
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
      const [portfolioData, poolMetadata] = await Promise.all([
        getDefiPortfolio(user?.wallet?.address || ""),
        getDefiPoolMetadata(),
      ])
      setDefiPortfolio(portfolioData.data || null)
      setDefiPoolMetadata(poolMetadata.data || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching DeFi data:", err)
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
      <h1 className="text-4xl font-bold mb-8">DeFi Portfolio</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Portfolio Details</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading DeFi portfolio...</span>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : !defiPortfolio ? (
            <div>No DeFi portfolio data available.</div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Value:</h3>
              <p className="text-2xl font-bold">${defiPortfolio.total_value.toFixed(2)}</p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Assets:</h3>
              <ul>
                {defiPortfolio.assets.map((asset, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-semibold">{asset.symbol}:</span> {asset.balance.toFixed(4)} ($
                    {asset.value.toFixed(2)})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>DeFi Pool Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading DeFi pool metadata...</span>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : defiPoolMetadata.length === 0 ? (
            <div>No DeFi pool metadata available.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pool</TableHead>
                    <TableHead>Protocol</TableHead>
                    <TableHead>Token 0</TableHead>
                    <TableHead>Token 1</TableHead>
                    <TableHead>Pair Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {defiPoolMetadata.map((pool, index) => (
                    <TableRow key={index}>
                      <TableCell>{pool.pool}</TableCell>
                      <TableCell>{pool.protocol}</TableCell>
                      <TableCell>{pool.token0}</TableCell>
                      <TableCell>{pool.token1}</TableCell>
                      <TableCell>{pool.pair_address}</TableCell>
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

