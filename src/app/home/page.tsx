"use client";

import CardsList from "@/components/cardsList";
import Header from "@/components/header";
import { useBalance } from "@/context/priceContext";
import {
  ArrowDown,
  ArrowDownUp,
  ArrowRight,
  ArrowRightLeft,
  CoinsIcon,
  Router,
} from "lucide-react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion, AnimatePresence } from "framer-motion";

import { db } from "@/services/firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

import { useTimer } from "react-timer-hook";
import { MdPix } from "react-icons/md";
import Steps from "@/components/steps";
import Carousel from "@/components/itens";
import { useRouter } from "next/navigation";

import Countdown from "react-countdown";
import BitcoinConverter from "@/components/bitcoin";

function AnimatedGrid() {
  const [selectedItem, setSelectedItem] = useState<number | null>(1);

  const router = useRouter();

  const handleSelect = (index: number) => {
    router.replace("/sacar");
    setSelectedItem(index); // Atualiza o estado com o índice do item selecionado
  };

  const items = [
    { icon: <ArrowRightLeft />, label: "Trade", invert: true },
    { icon: <ArrowDown />, label: "Sacar", invert: false },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 w-[100%] mt-9">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
          className="center-col z-30 relative"
          onClick={() => handleSelect(index)} // Define o item selecionado ao clicar
        >
          <div
            className={`center-col w-[70px]  mx-auto h-[70px] rounded-full border p-5 border-solid transition-colors shadow-md cursor-pointer duration-500${
              item.invert
                ? "" // Cor da borda para o item selecionado
                : " !bg-[#111111] !text-white border-[#111111]" // Cor da borda padrão
            }`}
          >
            {item.icon}
          </div>
          <span className="text-center mx-auto mt-4">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

const CountdownTimer = () => {
  const { expiryTimestamp, setExpiryTimestamp, expired, setExpired } =
    useBalance();

  const [newValue, setNewValue] = useState<any>();

  const { seconds, minutes, hours, isRunning, start, pause, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => setExpired(true),
    });

  useEffect(() => {
    const time = new Date();
    const balanceRef = doc(db, "cripto", "dados");

    const unsubscribe = onSnapshot(balanceRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();

        console.log(data);

        if (data.minutes) {
          const time = new Date();
          const novoExpiryTimestamp = new Date(
            time.getTime() + data.minutes * 60 * 1000
          );

          restart(novoExpiryTimestamp);
          setNewValue(novoExpiryTimestamp);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const formatTime = (time: number) => String(time).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center h-[100px] w-full center aspect-auto border-[2px] border-primary border-solid rounded-full mb-10"
    >
      <div className="text-4xl font-poppinsBold">
        <div className="text-4xl font-poppinsBold">
          <span>{formatTime(hours)}</span>:<span>{formatTime(minutes)}</span>:
          <span>{formatTime(seconds)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function MainPage() {
  const {
    balance,
    expired,
    addToBalance,
    setCurrentStep,
    currentStep,
    expiryTimestamp,
    setExpired,
  } = useBalance();

  const router = useRouter();

  const updateDocument = async (newMinutes: any) => {
    const balanceRef = doc(db, "cripto", "dados");

    try {
      await updateDoc(balanceRef, {
        minutes: newMinutes, // Novo valor para o campo 'minutes'
      });
      console.log("Documento atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o documento: ", error);
    }
  };

  const getRandomValue = (min: number, max: number) => {
    return (Math.random() * (max - min) + min).toFixed(8); // Retorna um valor fixo em 8 casas decimais
  };

<<<<<<< HEAD
  const handleMineBitcoin = async () => {
=======
  const { seconds, minutes, hours, isRunning, start, pause, restart } =
    useTimer();

  const handleMineBitcoin = () => {
>>>>>>> 1a8e63224a1d15a5f5091f6f3ae03692b8835e14
    const randomValue = parseFloat(getRandomValue(0.0000009, 0.0000015));
    setCurrentStep(currentStep + 1);
    setExpired(false);
    await addToBalance(randomValue); // Adiciona o valor gerado ao saldo
    await updateDocument(1);
    setExpired(true);

<<<<<<< HEAD
    // router.replace("/sacar");
=======
    const time = new Date();
    const novoExpiryTimestamp = new Date(time.getTime() + data.minutes * 60 * 1000);

    restart(novoExpiryTimestamp);

   // router.replace("/sacar");
>>>>>>> 1a8e63224a1d15a5f5091f6f3ae03692b8835e14

    // setExpired(false);
  };

  return (
    <main className="min-h-screen overflow-hidden !justify-start py-8 hero-section h-full w-full center-col bg-[#ffffff] !text-[#19181d] !select-none relative">
      <div className="center-col w-full px-4">
        <CountdownTimer />
        <div className="center-col h-[55px]  text-[#19181d] rounded-[15px] focus:outline-none space-x-2  active:opacity-80 transition-all">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="center text-xl font-poppinsLight space-x-2"
          >
            seu saldo:
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="font-poppinsExtrabold"
          >
            <CountUp
              start={0}
              end={balance}
              duration={1.5} // Duração da animação em segundos
              separator="."
              decimals={8} // Número de casas decimais
              decimal="."
              className="text-4xl text-green-500"
              preserveValue={true} // Mantém o valor atual e só anima a diferença
            />
            <span className="text-4xl font-poppinsSemibold text-[#19181d]">
              {" "}
              BTC
            </span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="center text-xl font-poppinsLight space-x-2"
          >
            <BitcoinConverter />
          </motion.span>
        </div>
        <AnimatedGrid />

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          disabled={!expired}
          onClick={handleMineBitcoin}
          className={`center relative z-20 my-5 ${
            !expired && "!grayscale-[90%]"
          } h-[55px] w-[98%] bg-success text-background rounded-[15px] focus:outline-none !text-white active:opacity-80`}
        >
          <span className="font-poppinsRegular">Minerar bitcoin</span>
        </motion.button>

        <Carousel />

        <Steps />

        
      </div>
    </main>
  );
}
