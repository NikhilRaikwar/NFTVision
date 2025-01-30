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

export const getTokenBalance = async (walletAddress: string, blockchain: string, offset = 0, limit = 30) => {
  try {
    const response = await api.get(
      `/token/balance?blockchain=${blockchain}&address=${walletAddress}&offset=${offset}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
}

export const getTokenMetrics = async (blockchain: string, offset = 0, limit = 30) => {
  try {
    const response = await api.get(`/token/metrics?blockchain=${blockchain}&offset=${offset}&limit=${limit}`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
}

export const getSupportedBlockchains = async (offset = 0, limit = 30) => {
  try {
    const response = await api.get(`/blockchains?offset=${offset}&limit=${limit}`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
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

export const getNFTPortfolio = async (wallet: string, blockchain: string, timeRange = "all", offset = 0, limit = 30) => {
  try {
    const response = await api.get(`/wallet/balance/nft?wallet=${wallet}&blockchain=${blockchain}&time_range=${timeRange}&offset=${offset}&limit=${limit}`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
}

export const getWashTradeData = async (blockchain = "ethereum", timeRange = "24h", sortBy = "name", sortOrder = "desc", offset = 0, limit = 30) => {
  try {
    const response = await api.get(
      `/nft/marketplace/washtrade?blockchain=${blockchain}&time_range=${timeRange}&sort_by=${sortBy}&sort_order=${sortOrder}&offset=${offset}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
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

// api.ts - Add NFT Transactions API integration
export const getNFTTransactions = async (blockchain = "ethereum", timeRange = "24h", offset = 0, limit = 30) => {
  try {
    const response = await api.get(
      `/nft/transactions?blockchain=${blockchain}&time_range=${timeRange}&offset=${offset}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Map blockchain names to their explorers
export const blockchainExplorerLinks = {
  ethereum: "https://etherscan.io/",
  binance: "https://bscscan.com/",
  bitcoin: "https://blockchain.info/",
  polygon: "https://polygonscan.com/",
  solana: "https://explorer.solana.com/",
  avalanche: "https://snowtrace.io/",
  linea: "https://explorer.linea.build/"
};
