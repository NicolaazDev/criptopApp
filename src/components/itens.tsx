import { Bitcoin } from "lucide-react";
import React from "react";

import { FaEthereum } from "react-icons/fa";
import { SiCardano, SiLitecoin, SiRipple } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

// Dados das criptomoedas
const cryptocurrencies = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "67.716,10",
    icon: <Bitcoin size={32} />, // Substitua pelos URLs reais dos ícones
    chart:
      "https://res.cloudinary.com/do9d7j6b3/image/upload/v1729029442/magicpattern-svg-chart-1729029390301_lozcur.png", // Substitua pelos URLs reais dos gráficos
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "2.677,00",
    icon: <FaEthereum size={32} />,
    chart:
      "https://res.cloudinary.com/do9d7j6b3/image/upload/v1729029440/magicpattern-svg-chart-1729029393375_rxdjjb.png", // Substitua pelos URLs reais dos gráficos
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    price: "70,80",
    icon: <SiLitecoin size={32} />, // Substitua pelos URLs reais dos ícones
    chart:
      "https://res.cloudinary.com/do9d7j6b3/image/upload/v1729029444/magicpattern-svg-chart-1729029357314_jetqps.png", // Substitua pelos URLs reais dos gráficos
  },
  {
    name: "Ripple",
    symbol: "XRP",
    price: "1.00",
    icon: <SiRipple size={32} />, // Substitua pelos URLs reais dos ícones
    chart:
      "https://res.cloudinary.com/do9d7j6b3/image/upload/v1729029436/magicpattern-svg-chart-1729029430301_n4ztqa.png", // Substitua pelos URLs reais dos gráficos
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: "1.50",
    icon: <SiCardano />,
    chart:
      "https://res.cloudinary.com/do9d7j6b3/image/upload/v1729029438/magicpattern-svg-chart-1729029429055_xcwkyj.png", // Substitua pelos URLs reais dos gráficos
  },
];

const Carousel = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden w-full mt-10"
    >
      <div className="flex animate-carousel">
        {cryptocurrencies.map((crypto, index) => (
          <div
            key={index}
            className="relative w-[150px] h-[150px] border border-solid !bg-[#f5f5f5] z-40 border-gray-400 mx-2 flex-shrink-0 rounded-lg overflow-hidden"
          >
            {/* Gráfico de fundo */}
            <img
              src={crypto.chart}
              alt={`${crypto.name} chart`}
              className="absolute inset-0 z-30 w-full h-full object-cover opacity-90 translate-y-[10%]" // Gráfico em segundo plano
            />
            <div className="absolute top-3 z-40 left-2 z-10 center-col !items-start  p-2 bg-opacity-70 rounded-lg">
              {crypto.icon}
              <h3 className="text-lg  font-poppinsRegular mt-2">
                {crypto.name}
              </h3>
              <p className="text-sm font-poppinsLight text-[#1f1f1f] !opacity-100">
                ${crypto.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Carousel;
