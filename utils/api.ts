import axios, { type AxiosError } from "axios"

const API_KEY = process.env.NEXT_PUBLIC_UNLEASH_API_KEY
const BASE_URL = "https://api.unleashnfts.com/api/v2"

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    "x-api-key": API_KEY,
  },
})

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    console.error("API Error Response:", error.response.data)
    console.error("API Error Status:", error.response.status)
    console.error("API Error Headers:", error.response.headers)
    throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`)
  } else if (error.request) {
    console.error("API Error Request:", error.request)
    throw new Error("No response received from the API")
  } else {
    console.error("API Error:", error.message)
    throw new Error(`API Error: ${error.message}`)
  }
}

export const getNFTMarketAnalytics = async (blockchain = "ethereum", timeRange = "24h") => {
  try {
    const response = await api.get(`/nft/market-insights/analytics?blockchain=${blockchain}&time_range=${timeRange}`)
    return response.data
  } catch (error) {
    handleApiError(error as AxiosError)
  }
}

export const getTokenBalance = async (offset = 0, limit = 30) => {
  try {
    const response = await api.get(`/token/balance?offset=${offset}&limit=${limit}`)
    return response.data
  } catch (error) {
    handleApiError(error as AxiosError)
  }
}

export const getTokenMetrics = async (offset = 0, limit = 30) => {
  try {
    const response = await api.get(`/token/metrics?offset=${offset}&limit=${limit}`)
    return response.data
  } catch (error) {
    handleApiError(error as AxiosError)
  }
}

export const getSupportedBlockchains = async (offset = 0, limit = 30) => {
  try {
    const response = await api.get(`/blockchains?offset=${offset}&limit=${limit}`)
    return response.data
  } catch (error) {
    handleApiError(error as AxiosError)
  }
}

export const getDefiPortfolio = async (address: string, blockchain = "ethereum") => {
  try {
    const response = await api.get(`/wallet/balance/defi?address=${address}&blockchain=${blockchain}`)
    return response.data
  } catch (error) {
    handleApiError(error as AxiosError)
  }
}

export const getNFTMarketplaceMetadata = async () => {
  try {
    const response = await api.get("/nft/marketplace/metadata")
    return response.data
  } catch (error) {
    handleApiError(error as AxiosError)
  }
}

