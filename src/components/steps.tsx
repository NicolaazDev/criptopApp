import { useBalance } from "@/context/priceContext";
import { motion } from "framer-motion";

const Steps = () => {
  const { currentStep } = useBalance(); // Acessando o estado de steps

  const steps = Array(9).fill(0); // Criando um array com 9 bolinhas

  // Labels para os steps 3, 6, 9 (índices 2, 5, 8)
  const stepLabels = {
    2: "1 BRL",
    5: "3 BRL",
    8: "8 BRL",
  };

  // Função para verificar se o índice é um dos steps com label especial
  const isSpecialStep = (index: number) => {
    return index === 2 || index === 5 || index === 8;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="center-col !bg-[#f5f5f5] z-20 relative space-y-4 mt-4 w-[98%] border border-primary border-solid rounded-xl pb-[50px] pt-4 px-10"
    >
      {/* Grid para Steps */}
      <h1 className="text-center font-poppinsRegular text-[16px] mb-5">
        Ganha recompensas por minerar BitCoins{" "}
      </h1>
      <div className="grid grid-cols-9 gap-4 w-full h-auto ">
        {steps.map((_, index) => (
          <div key={index} className="center-col relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: index === currentStep ? 1.2 : 1,
                opacity: index <= currentStep ? 1 : 0.5,
                backgroundColor: isSpecialStep(index)
                  ? index <= currentStep
                    ? "#9b80ff" // Cor dourada para steps especiais completados
                    : "#c2d2ff" // Cor clara para steps especiais não completados
                  : index <= currentStep
                  ? "#7fe482" // Cor verde para steps comuns completados
                  : "#ccc", // Cor cinza para steps comuns não completados
              }}
              transition={{ duration: 0.3 }}
              className="w-3 h-3 rounded-full" // Ajuste de tamanho
            />
            {stepLabels[index] && (
              <span className="text-xs absolute font-semibold whitespace-nowrap mt-2 text-gray-700 translate-y-[140%]">
                {stepLabels[index]}
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
