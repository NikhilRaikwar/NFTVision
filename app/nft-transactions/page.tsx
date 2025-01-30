"use client";
import { useEffect, useState } from "react";
import { getNFTTransactions, blockchainExplorerLinks } from "@/utils/api";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NFTTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blockchain, setBlockchain] = useState("ethereum");

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      const data = await getNFTTransactions(blockchain);
      setTransactions(data?.data || []);
      setLoading(false);
    }
    fetchTransactions();
  }, [blockchain]);

  return (
    <Layout showBackButton>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">NFT Transactions</h1>
        </div>
        <div className="mb-4">
          <Select value={blockchain} onValueChange={setBlockchain}>
            <SelectTrigger className="w-64">
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
        </div>
        {loading ? (
          <p>Loading transactions...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactions.map((tx, index) => (
              <Card key={index} className="overflow-hidden break-words p-4">
                <CardHeader>
                  <CardTitle>{tx.transaction_type.toUpperCase()}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Hash:</strong> <a href={`${blockchainExplorerLinks[blockchain]}tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">{tx.hash}</a></p>
                  <p><strong>Blockchain:</strong> {tx.blockchain}</p>
                  <p><strong>Collection:</strong> {tx.collection}</p>
                  <p><strong>Sender:</strong> <a href={`${blockchainExplorerLinks[blockchain]}address/${tx.sending_address}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">{tx.sending_address}</a></p>
                  <p><strong>Receiver:</strong> <a href={`${blockchainExplorerLinks[blockchain]}address/${tx.receiving_address}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">{tx.receiving_address}</a></p>
                  <p><strong>Price:</strong> ${tx.sale_price_usd || "0"}</p>
                  <p><strong>Date:</strong> {new Date(tx.timestamp).toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
