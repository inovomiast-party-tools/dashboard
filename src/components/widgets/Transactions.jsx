"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoCashOutline, IoCodeOutline } from "react-icons/io5";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import Link from 'next/link'

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially

  const fetchTransactions = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("/api/tokens/transactions/");
      setTransactions(response.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    setLoading(false); // End loading
  };

  useEffect(() => {
    fetchTransactions(); // Fetch transactions on component mount
    // Optionally, set up a polling mechanism if needed
    // const fetchTransactionsInterval = setInterval(() => {
    //   fetchTransactions();
    // }, 600000); // Fetch transactions every 10 minutes

    // return () => clearInterval(fetchTransactionsInterval);
  }, []);

  return (
    <div className="flex-grow p-4 mt-5 ml-4 mr-3 bg-gray-800 border-2 h-[295px] border-white rounded-lg overflow-auto">
      <div className="flex h-full overflow-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="w-8 h-8 loading loading-spinner"></div>
            <p className="mt-2">Loading...</p>
          </div>
        ) : transactions.length > 0 ? (
          <>
            <div className="sticky top-0 z-10 py-2 bg-gray-800">
              <div className="flex">
                <h1 className="flex items-center text-xl font-bold text-white">
                  Transactions{" "}
                  <RiMoneyEuroCircleLine size={20} className="ml-1" />
                </h1>
              </div>
            </div>
            <table className="w-full border-collapse table-auto">
              <thead>
                <tr>
                  <th className="p-0 text-lg font-bold">Transaction ID:</th>
                  <th className="p-0">Amount:</th>
                  <th className="p-0">Status:</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="p-0 text-center hover:underline hover:text-white hover:cursor-pointer"><Link href={`/tokens/transaction/${transaction?.transId}`}>{transaction?.transId}</Link></td>
                    <td className="p-0 text-center">
                      {transaction.transAmount}{" "}
                      <IoCashOutline className="inline -mt-1" size={20} />
                    </td>
                    <td className="p-0 text-center">{ transaction.transStatus === "success" ? "✅" : transaction.transStatus === "pending" ? "🤔" : "❌" }</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="text-white">No transactions found.</p> // Display a message if no transactions are found
        )}
      </div>
    </div>
  );
};

export default Transactions;
