"use client"

import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getNFTPriceEstimate, getNFTLiquifySupportedCollections } from "@/utils/api"
import { Loader2 } from "lucide-react"
import Image from "next/image"

interface SupportedCollection {
  address: string
  collection_name: string
  thumbnail_url: string
}

interface PriceEstimate {
  estimated_price: number
  confidence_level: string
}

export default function NFTPriceEstimatePage() {
  const { authenticated } = usePrivy()
  const router = useRouter()
  const [priceEstimate, setPriceEstimate] = useState<PriceEstimate | null>(null)
  const [supportedCollections, setSupportedCollections] = useState<SupportedCollection[]>([])
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
      const [estimateData, collectionsData] = await Promise.all([
        getNFTPriceEstimate(),
        getNFTLiquifySupportedCollections(),
      ])
      setPriceEstimate(estimateData.data || null)
      setSupportedCollections(collectionsData.data || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching NFT data:", err)
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
      <h1 className="text-4xl font-bold mb-8">NFT Price Estimate</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Price Estimate Details</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading price estimate...</span>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : !priceEstimate ? (
            <div>No price estimate data available.</div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-2">Estimated Price:</h3>
              <p className="text-2xl font-bold">${priceEstimate.estimated_price.toFixed(2)}</p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Confidence Level:</h3>
              <p>{priceEstimate.confidence_level}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Supported Collections</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading supported collections...</span>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : supportedCollections.length === 0 ? (
            <div>No supported collections available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {supportedCollections.map((collection, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <Image
                      src={collection.thumbnail_url || "/placeholder.svg"}
                      alt={collection.collection_name}
                      width={100}
                      height={100}
                      className="rounded-full mx-auto mb-2"
                    />
                    <h3 className="text-center font-semibold">{collection.collection_name}</h3>
                    <p className="text-center text-sm text-gray-500">{collection.address}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  )
}

