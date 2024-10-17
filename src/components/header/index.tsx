"use client";

import React from "react";

import { CoinsIcon } from "lucide-react";
import { useBalance } from "@/context/priceContext";
import CountUp from "react-countup";

import { useRouter } from "next/navigation";
import { MdPix } from "react-icons/md";

interface HeaderLinkProps {
  title: string;
  href: string;
  icon?: any;
  isActive: boolean;
}

const BalanceButton: React.FC = () => {
  const { balance } = useBalance();

  return (
    <button className="center h-[55px]  text-background rounded-[15px] focus:outline-none bg-primary space-x-2 !text-white active:opacity-80 transition-all">
      <span className="font-poppinsMedium center space-x-2">
        <CoinsIcon className="mr-2" /> SALDO:
      </span>
      <span className="font-poppinsRegular">
        R$
        <CountUp
          start={0}
          end={balance}
          duration={1.5} // Duração da animação em segundos
          separator="."
          decimals={2} // Número de casas decimais
          decimal=","
          preserveValue={true} // Mantém o valor atual e só anima a diferença
        />
      </span>
    </button>
  );
};
const SakeButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/sacar")}
      className="center ml-3 h-[55px] min-w-[45px] bg-success text-background rounded-[15px] focus:outline-none !text-white active:opacity-80 transition-all"
    >
      <MdPix size={18} className="mr-2" />
      <span className="font-poppinsRegular">Sacar</span>
    </button>
  );
};

export default function Header() {
  return (
    <header className="w-full center-col absolute top-0 bg-[#1a191c] z-20">
      <div className="grid grid-cols-[2fr_1fr] w-full py-4 px-2">
        <BalanceButton />
        <SakeButton />
      </div>
    </header>
  );
}
