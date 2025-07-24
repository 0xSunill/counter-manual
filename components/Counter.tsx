"use client";
import React, { useState } from "react";
import { useCounter } from "@/anchor/utils/useCounter";

export default function Counter() {
  const [count, setCount] = useState(0);
  const { initializeCounter, incrementCounter, fetchCounter } = useCounter();

  const countHandler = async () => {
    try {
      await fetchCounter();
    } catch (err) {
      if (
        err instanceof Error &&
        err.message.includes("Account does not exist")
      ) {
        await initializeCounter();
      } else {
        console.error("Unexpected error:", err);
        return;
      }
    }

    await incrementCounter();
    const val = await fetchCounter();
    setCount(val);
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center text-white min-h-screen">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center space-y-6 w-full max-w-sm">
        <h1 className="text-3xl font-bold">Counter</h1>
        <div className="text-5xl font-semibold">{count}</div>
        <button
          onClick={countHandler}           
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200"
        >
          Increment
        </button>
      </div>
    </div>
  );
}
