"use client";

import { useBalance } from "@/context/priceContext";
import { generateRandomCardsData } from "@/mocks/cards";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useRef, useState } from "react";

const CardItem = forwardRef(
  (
    {
      img,
      price,
      onLike,
      nextCardRef,
    }: {
      img: string;
      price: number;
      onLike: () => void;
      nextCardRef?: React.RefObject<HTMLDivElement>;
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { addToBalance } = useBalance();

    const handleLike = () => {
      addToBalance(price);
      onLike();

      if (nextCardRef && nextCardRef.current) {
        nextCardRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    const handleDislike = () => {
      onLike();
      if (nextCardRef && nextCardRef.current) {
        nextCardRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <div
        ref={ref}
        className="w-full min-h-[85vh] z-10 bg-[#1a191c] object-cover center-col !justify-between relative p-4 py-1 pt-6 border-[1px] shadow-lg shadow-[#97979791] border-solid border-[#dfdfdf] rounded-lg"
      >
        <img
          src={img}
          alt="card"
          className="w-full h-[90%] rounded-lg object-cover"
        />
        <p className="text-lg font-poppinsLight absolute z-10 top-4 right-4 bg-background px-5 py-[10px] rounded-lg border border-solid border-foreground">
          +R$ {price},00
        </p>
        <h2 className="font-poppinsMedium text-xl my-3 mt-4">
          Você gostou desse look?
        </h2>
        <div className="grid grid-cols-2 w-full gap-x-2 min-h-[50px] mt-2 mb-3 ">
          <button
            onClick={handleLike}
            className="bg-success uppercase font-poppinsSemibold h-full center w-full text-background rounded-lg !text-white active:opacity-80 transition-all"
          >
            <ThumbsUp className="mr-2" />
            Gostei
          </button>
          <button
            onClick={handleDislike}
            className="bg-destructive uppercase font-poppinsSemibold h-full center w-full text-background rounded-lg !text-white active:opacity-80 transition-all"
          >
            <ThumbsDown className="mr-2" />
            Não Gostei
          </button>
        </div>
      </div>
    );
  }
);

CardItem.displayName = "CardItem";

export default function CardsList() {
  const listRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [likeCount, setLikeCount] = useState(0); // Estado para rastrear cliques
  const router = useRouter();
  const [cards, setCards] = useState<any>([]);

  const handleLike = (index: number) => {
    setLikeCount((prevCount) => prevCount + 1);

    // Se houver um próximo cartão, rolar para ele
    if (cardRefs.current[index + 1]) {
      const nextCard = cardRefs.current[index + 1];

      // Calcule a posição do próximo cartão e adicione 100 pixels de deslocamento
      const nextCardPosition =
        nextCard.getBoundingClientRect().top +
        listRef.current!.scrollTop - // Use listRef para a rolagem
        listRef.current!.getBoundingClientRect().top;

      // Rolagem suave para a nova posição
      listRef.current!.scrollTo({
        top: nextCardPosition,
        behavior: "smooth",
      });
    }

    if (likeCount + 1 === 5) {
      router.push("/sacar");
    }
  };

  useEffect(() => {
    // Gera os cartões aleatórios quando o componente é montado
    const generatedCards: any = generateRandomCardsData(10);
    setCards(generatedCards);
  }, []);

  return (
    <div
      ref={listRef}
      className="w-full h-screen center-col !justify-start space-y-8 overflow-hidden mt-[100px] px-4"
    >
      {cards &&
        cards.map((card: any, index: any) => (
          <CardItem
            key={card.img}
            img={card.img}
            price={card.price}
            onLike={() => handleLike(index)}
            ref={(el) => (cardRefs.current[index] = el)}
          />
        ))}
    </div>
  );
}
