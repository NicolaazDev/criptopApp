import { useBalance } from "@/context/priceContext";
import React, { useState, useEffect } from "react";

// Preço fixo do Bitcoin em reais
const BITCOIN_PRICE_BRL = 601899; // Atualize o preço conforme necessário

const BitcoinConverter = () => {
  const [realAmount, setRealAmount] = useState(0);

  // Recupera o saldo de Bitcoin do contexto
  const { balance } = useBalance();

  useEffect(() => {
    if (balance) {
      const convertedValue = parseFloat(balance) * BITCOIN_PRICE_BRL;
      setRealAmount(convertedValue.toFixed(2));
    }
  }, [balance]);

  return (
    <div className="converter-container text-sm bg-[#dddddd] py-1 px-2 rounded-lg">
      <h3>
        Valor em Reais:{" "}
        <span className="font-poppinsMedium">R$ {realAmount}</span>
      </h3>
    </div>
  );
};

export default BitcoinConverter;
