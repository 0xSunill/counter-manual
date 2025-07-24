
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import {
    AnchorProvider,
    Program,
    web3,
    Idl,
} from "@coral-xyz/anchor";

import idl from "../target/idl/anchor.json";
import { useConnection } from "@solana/wallet-adapter-react";

const programId = new PublicKey("D4EHFhaNXjqPeyqcPkY5ftsYF4ktJYwMqmXLwpZsbti9");




export function useCounter() {

    console.log("⛏️ IDL:", idl);
    const wallet = useWallet();
    const { connection } = useConnection();
    const provider = new AnchorProvider(connection, wallet as any, {
        preflightCommitment: "processed",
    });

    const program = new Program(idl as Idl, programId, provider);

    const getCounterPDA = async () => {
        return PublicKey.findProgramAddressSync(
            [Buffer.from("counter"), wallet.publicKey!.toBuffer()],
            program.programId
        );
    };


    const initializeCounter = async () => {
        const [counterPDA, bump] = await getCounterPDA();

        await program.methods
            .initialize()
            .accounts({
                counter: counterPDA,
                user: wallet.publicKey!,
                systemProgram: web3.SystemProgram.programId,
            })
            .rpc();
    };

    const incrementCounter = async () => {
        const [counterPDA] = await getCounterPDA();

        await program.methods
            .increment()
            .accounts({
                counter: counterPDA,
                user: wallet.publicKey!,
            })
            .rpc();
    };

    const fetchCounter = async (): Promise<number> => {
        const [counterPDA] = await getCounterPDA();
        const counter = await program.account.counter.fetch(counterPDA);
        return counter.value.toNumber();
    };

    return {
        initializeCounter,
        incrementCounter,
        fetchCounter,
    };
}