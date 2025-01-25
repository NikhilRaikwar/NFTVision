"use client"

import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getSupportedBlockchains } from "@/utils/api"
import { Loader2 } from "lucide-react"
import Image from "next/image"

interface Blockchain {
  chain_id: number
  description: string
  id: number
  image_url: string
  name: string
  symbol: string
}

export default function SupportedBlockchainsPage() {
  const { authenticated } = usePrivy()
  const router = useRouter()
  const [blockchains, setBlockchains] = useState<Blockchain[]>([])
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
      const data = await getSupportedBlockchains()
      setBlockchains(data.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching supported blockchains:", err)
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
      <h1 className="text-4xl font-bold mb-8">Supported Blockchains</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Loading supported blockchains...</span>
          </div>
        ) : error ? (
          <div className="col-span-full text-red-500">{error}</div>
        ) : blockchains.length === 0 ? (
          <div className="col-span-full">No supported blockchains available.</div>
        ) : (
          blockchains.map((blockchain, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Image
                    src={blockchain.image_url || "/placeholder.svg"}
                    alt={`${blockchain.name} logo`}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  {blockchain.name} ({blockchain.symbol})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Chain ID:</strong> {blockchain.chain_id}
                </p>
                <p>
                  <strong>Description:</strong> {blockchain.description}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </Layout>
  )
}

