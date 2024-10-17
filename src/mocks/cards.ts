// Array de imagens para randomizar
const images = [
  "https://estilopropriobysir.com/wp-content/uploads/Como-usar-os-looks-da-Shein-em-2023-short.jpg",
  "https://estilopropriobysir.com/wp-content/uploads/look-minimalista-Como-usar-os-looks-da-Shein-em-2023.jpg",
  "https://i.pinimg.com/1200x/2c/ae/41/2cae41c2ab9cbcfe90a5c98e43eb2531.jpg",
  "https://estilopropriobysir.com/wp-content/uploads/Como-usar-os-looks-da-Shein-em-2023-calca-508x900.jpg",
  "https://img.ltwebstatic.com/images3_spmp/2023/10/24/9d/16981073691c37000bd4c4979a1c7525de5f0f81ab.webp",
  "https://img.ltwebstatic.com/images3_spmp/2023/12/28/cd/17037686023d2eba7c45b3cee097fb2778533b2e0f_thumbnail_720x.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7qukw-lg18lqus7g1qfc",
  "https://i.pinimg.com/736x/2f/d8/2c/2fd82c458920db108c45cb53dbe0e9b8.jpg",
  "https://i.pinimg.com/originals/ae/63/0f/ae630f849805c69ab51872dd08e07da1.jpg",
];

// Função para embaralhar um array
const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
  }
  return array;
};

// Função para randomizar o cardsData
export const generateRandomCardsData = (numCards: number) => {
  // Embaralha as imagens
  const shuffledImages = shuffleArray([...images]);

  const cards = [];
  
  for (let i = 0; i < numCards; i++) {
    const randomPrice = Math.floor(Math.random() * (300 - 150 + 1)) + 150; // Preço entre 150 e 300

    cards.push({
      img: shuffledImages[i], // Usa a imagem embaralhada
      price: randomPrice,
    });
  }

  return cards;
};

