import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Welcome to NFTVision, your premier destination for comprehensive NFT analytics and insights. We are
              dedicated to providing real-time data and analysis to help you navigate the dynamic world of NFTs and
              digital assets.
            </p>
            <p>
              Our platform combines cutting-edge technology with user-friendly interfaces to deliver accurate, timely,
              and actionable insights across multiple blockchains and marketplaces.
            </p>
            <h3 className="text-xl font-semibold mt-6">What We Offer</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Real-time NFT market analytics and trends</li>
              <li>Comprehensive token metrics and balance tracking</li>
              <li>Multi-blockchain support and analysis</li>
              <li>NFT marketplace insights and comparisons</li>
              <li>User-friendly interface with powerful features</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

