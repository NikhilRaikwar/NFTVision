"use client"

import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getNFTMarketAnalytics } from "@/utils/api"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface MarketAnalytics {
  blockchain: string
  chain_id: number
  volume: number
  volume_change: number
  volume_trend: number[]
  sales: number
  sales_change: number
  sales_trend: number[]
  transactions: number
  transactions_change: number
  transactions_trend: number[]
  transfers: number
  transfers_change: number
  transfers_trend: number[]
  block_dates: string[]
}

const blockchains = [
  "ethereum",
  "binance",
  "polygon",
  "solana",
  "avalanche",
  "linea",
  "bitcoin",
  "unichain_sepolia",
  "full",
]
const timeRanges = [
  { value: "15m", label: "15 Minutes" },
  { value: "30m", label: "30 Minutes" },
  { value: "24h", label: "24 Hours" },
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
  { value: "all", label: "All Time" },
]

export default function NFTMarketAnalyticsPage() {
  const { authenticated } = usePrivy()
  const router = useRouter()
  const [marketAnalytics, setMarketAnalytics] = useState<MarketAnalytics | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedBlockchain, setSelectedBlockchain] = useState("ethereum")
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")

  useEffect(() => {
    if (!authenticated) {
      router.push("/")
    }
  }, [authenticated, router])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getNFTMarketAnalytics(selectedBlockchain, selectedTimeRange)
      setMarketAnalytics(data.data[0])
    } catch (err) {
      console.error("Error fetching NFT market analytics:", err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
      setMarketAnalytics(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchData()
  }

  const formatChartData = (analytics: MarketAnalytics | null) => {
    if (!analytics) return []
    return analytics.block_dates.map((date, index) => ({
      date,
      volume: analytics.volume_trend[index],
      sales: analytics.sales_trend[index],
      transactions: analytics.transactions_trend[index],
      transfers: analytics.transfers_trend[index],
    }))
  }

  if (!authenticated) {
    return null
  }

  return (
    <Layout showBackButton>
      <h1 className="text-4xl font-bold mb-8">NFT Market Analytics Report</h1>
      <form onSubmit={handleSubmit} className="flex space-x-4 mb-4">
        <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select blockchain" />
          </SelectTrigger>
          <SelectContent>
            {blockchains.map((blockchain) => (
              <SelectItem key={blockchain} value={blockchain}>
                {blockchain.charAt(0).toUpperCase() + blockchain.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">Submit</Button>
      </form>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading market analytics...</span>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : !marketAnalytics ? (
            <div>No market analytics data available. Please submit a query.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Volume</h3>
                <p className="text-2xl font-bold">${marketAnalytics.volume.toFixed(2)}</p>
                <p className={`text-sm ${marketAnalytics.volume_change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {(marketAnalytics.volume_change * 100).toFixed(2)}%
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Sales</h3>
                <p className="text-2xl font-bold">{marketAnalytics.sales}</p>
                <p className={`text-sm ${marketAnalytics.sales_change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {(marketAnalytics.sales_change * 100).toFixed(2)}%
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Transactions</h3>
                <p className="text-2xl font-bold">{marketAnalytics.transactions}</p>
                <p
                  className={`text-sm ${marketAnalytics.transactions_change >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {(marketAnalytics.transactions_change * 100).toFixed(2)}%
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Transfers</h3>
                <p className="text-2xl font-bold">{marketAnalytics.transfers}</p>
                <p className={`text-sm ${marketAnalytics.transfers_change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {(marketAnalytics.transfers_change * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Market Trends</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading market trends...</span>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : !marketAnalytics ? (
            <div>No market trends data available. Please submit a query.</div>
          ) : (
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formatChartData(marketAnalytics)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="volume" stroke="#8884d8" name="Volume" />
                  <Line type="monotone" dataKey="sales" stroke="#82ca9d" name="Sales" />
                  <Line type="monotone" dataKey="transactions" stroke="#ffc658" name="Transactions" />
                  <Line type="monotone" dataKey="transfers" stroke="#ff7300" name="Transfers" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  )
}

