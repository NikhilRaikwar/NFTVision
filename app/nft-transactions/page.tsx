"use client"

import { useEffect, useState } from "react"
import { getNFTTransactions } from "@/utils/api"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function NFTTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blockchain, setBlockchain] = useState("ethereum");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      const data = await getNFTTransactions(blockchain);
      setTransactions(data?.data || []);
      setLoading(false);
    }
    fetchTransactions();
  }, [blockchain]);

  useEffect(() => {
    // Filter transactions based on search query
    const filtered = transactions.filter(tx => 
      tx.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.sending_address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTransactions(filtered);
  }, [searchQuery, transactions]);

  return (
    <Layout showBackButton>
      <h1 className="text-4xl font-bold mb-6">NFT Transactions</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <Select value={blockchain} onValueChange={setBlockchain}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Select Blockchain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ethereum">Ethereum</SelectItem>
            <SelectItem value="binance">Binance</SelectItem>
            <SelectItem value="bitcoin">Bitcoin</SelectItem>
            <SelectItem value="polygon">Polygon</SelectItem>
            <SelectItem value="solana">Solana</SelectItem>
            <SelectItem value="avalanche">Avalanche</SelectItem>
            <SelectItem value="linea">Linea</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search by Collection, Hash, Sender"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64"
        />
      </div>

      {/* Transactions List */}
      {loading ? (
        <p className="text-center">Loading transactions...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTransactions.length === 0 ? (
            <div className="col-span-full text-center">No transactions found.</div>
          ) : (
            filteredTransactions.map((tx, index) => (
              <Card key={index} className="overflow-hidden break-words p-4">
                <CardHeader>
                  <CardTitle>{tx.transaction_type.toUpperCase()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Hash:</strong> <a href={`https://etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">{tx.hash}</a></p>
                  <p><strong>Blockchain:</strong> {tx.blockchain}</p>
                  <p><strong>Collection:</strong> {tx.collection}</p>
                  <p><strong>Sender:</strong> <a href={`https://etherscan.io/address/${tx.sending_address}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">{tx.sending_address}</a></p>
                  <p><strong>Receiver:</strong> <a href={`https://etherscan.io/address/${tx.receiving_address}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">{tx.receiving_address}</a></p>
                  <p><strong>Price:</strong> ${tx.sale_price_usd || "0"}</p>
                  <p><strong>Date:</strong> {new Date(tx.timestamp).toLocaleString()}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </Layout>
  );
}
