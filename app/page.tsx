"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  const { publicKey, connected } = useWallet();

  return (
    <div>
      <h1>Hello Sunil</h1>
      <WalletMultiButton />

      {connected ? (
        <p>Connected Wallet: {publicKey?.toBase58()}</p>
      ) : (
        <p>Wallet not connected</p>
      )}
    </div>
  );
}
