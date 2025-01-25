"use client"

import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCollectionProfile, getCollectionCategories } from "@/utils/api"
import { Loader2 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface CollectionProfile {
  active_profiles: number
  engagement_rate: number
  growth_rate: number
}

interface Category {
  Name: string
  Description: string
}

export default function CollectionProfilePage() {
  const { authenticated, user } = usePrivy()
  const router = useRouter()
  const [collectionProfile, setCollectionProfile] = useState<CollectionProfile | null>(null)
  const [collectionCategories, setCollectionCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authenticated) {
      router.push("/")
    } else if (!user?.wallet?.address) {
      setError("Wallet address not available. Please connect your wallet.")
    } else {
      fetchData()
    }
  }, [authenticated, router, user?.wallet?.address])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [profileData, categoriesData] = await Promise.all([
        getCollectionProfile(user?.wallet?.address || ""),
        getCollectionCategories(),
      ])
      setCollectionProfile(profileData.data[0] || null)
      setCollectionCategories(categoriesData.data || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching collection data:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return null
  }

  const chartData = collectionProfile
    ? [
        { name: "Active Profiles", value: collectionProfile.active_profiles },
        { name: "Engagement Rate", value: collectionProfile.engagement_rate * 100 },
        { name: "Growth Rate", value: collectionProfile.growth_rate * 100 },
      ]
    : []

  return (
    <Layout showBackButton>
      <h1 className="text-4xl font-bold mb-8">Collection Profile</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Profile Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading collection profile...</span>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : !collectionProfile ? (
            <div>No collection profile data available.</div>
          ) : (
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Collection Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading collection categories...</span>
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : collectionCategories.length === 0 ? (
            <div>No collection categories available.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {collectionCategories.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{category.Name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{category.Description}</p>
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

