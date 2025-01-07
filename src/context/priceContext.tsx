"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { db } from "@/services/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { start } from "repl";

// Context
const BalanceContext = createContext({
  balance: 0,
  addToBalance: (amount: number) => {},
  subtractFromBalance: (amount: number) => {},
  expiryTimestamp: new Date(),
  setExpiryTimestamp: (newTime: Date) => {},
  expired: false, // Novo estado para expiração do timer
  setExpired: (isExpired: boolean) => {},
  currentStep: 0, // Estado para os steps
  setCurrentStep: (step: number) => {},
  start: false,
  setStart: (start: boolean) => {},
});

// Provider
export const BalanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [balance, setBalance] = useState<number>(0.0000088);
  const [expired, setExpired] = useState(false);
  const [start, setStart] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [expiryTimestamp, setExpiryTimestamp] = useState<any>();

  useEffect(() => {
    // Inicializa o saldo com o valor armazenado no localStorage, se houver.
    const storedBalance = localStorage.getItem("balance");
    if (storedBalance) {
      setBalance(parseFloat(storedBalance));
    }

    const balanceRef = doc(db, "cripto", "dados"); // Substitua "seu_documento_id" pelo ID do seu documento
    const unsubscribe = onSnapshot(balanceRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setBalance(data.bitcoins); // Supondo que você tenha um campo 'balance' no documento
        localStorage.setItem("balance", data.bitcoins.toString()); // Atualiza o localStorage

        if (data.minutes) {
          const time = new Date();
          const novoExpiryTimestamp = new Date(
            time.getTime() + data.minutes * 60 * 1000
          );
          setExpiryTimestamp(novoExpiryTimestamp);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const addToBalance = (amount: number) => {
    setBalance((prevBalance) => {
      const newBalance = prevBalance + amount;
      localStorage.setItem("balance", newBalance.toString()); // Atualiza no localStorage
      return newBalance;
    });
  };

  const subtractFromBalance = (amount: number) => {
    setBalance((prevBalance) => {
      const newBalance = prevBalance - amount;
      localStorage.setItem("balance", newBalance.toString()); // Atualiza no localStorage
      return newBalance;
    });
  };

  return (
    <BalanceContext.Provider
      value={{
        balance,
        addToBalance,
        subtractFromBalance,
        expiryTimestamp,
        setExpiryTimestamp,
        expired,
        setExpired,
        currentStep,
        setCurrentStep,
        start,
        setStart,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

// Hook para acessar o saldo e a função de atualização
export const useBalance = () => useContext(BalanceContext);
