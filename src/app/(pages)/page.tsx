"use client";

import { WalletButton } from "@/components/solana/SolanaProvider";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-5xl font-bold">gm</h1>
        <WalletButton />
      </main>
    </div>
  )
}
