"use client"

import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTokenBalance } from "@/utils/api"
import { Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TokenBalance {
  token_symbol: string
  token_name: string
  blockchain: string
  balance: string
}

export default function TokenBalancePage() {
  const { authenticated } = usePrivy()
  const router = useRouter()
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([])
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
      const data = await getTokenBalance()
      setTokenBalances(data.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching token balances:", err)
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
      <h1 className="text-4xl font-bold mb-8">Token Balance</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Token Balances</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading token balances...</span>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : tokenBalances.length === 0 ? (
            <div>No token balances available.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token Symbol</TableHead>
                  <TableHead>Token Name</TableHead>
                  <TableHead>Blockchain</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokenBalances.map((token, index) => (
                  <TableRow key={index}>
                    <TableCell>{token.token_symbol}</TableCell>
                    <TableCell>{token.token_name}</TableCell>
                    <TableCell>{token.blockchain}</TableCell>
                    <TableCell>{token.balance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Layout>
  )
}

