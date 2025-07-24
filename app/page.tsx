"use client";

import Counter from "@/components/Counter";
import Nav from "@/components/Nav";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  const { publicKey, connected } = useWallet();

  return (
    <div className="flex justify-center items-center flex-col h-screen ">
      <Nav />
      <Counter />
    </div>
  );
}
