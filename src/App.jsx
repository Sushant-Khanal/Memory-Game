import { GameHeader } from "./components/GameHeader";
import { Card } from "./components/Card";
import { use } from "react";
import { useEffect, useState } from "react";

const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🍑",
  "🍍",
  "🥝",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🍑",
  "🍍",
  "🥝",
];


function App() {

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  const initializeGame = () => {
    //shuffle the cards

    const finalCards = cardValues.map((value, index) => (
      {id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }
    ));

    setCards(finalCards);

  }

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
      // Don't allow clicking if card is already flipped, matched
      if (card.isFlipped || card.isMatched) return;

      // Update card flipped state
      const newCards = cards.map((c) =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      );
      setCards(newCards);

      const newFlippedCards = [...flippedCards, card.id];
      setFlippedCards(newFlippedCards);

      // Check for match if 2 cards are flipped
      if (flippedCards.length === 1) {
        const firstCard = cards[flippedCards[0]];

        if (firstCard.value === card.value) {
          // Mark both cards as matched
          setTimeout (() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);

            setScore((prev) => prev + 1);

          setCards((prev) => 
              prev.map((c) => {
                if (c.id === firstCard.id || c.id === card.id) {
                  return { ...c, isMatched: true };
                } else {
                  return c;
                }
                })
          );
          setFlippedCards([]);
        }, 500);

        } else{
          // Flip both cards back after a short delay

          setTimeout(() => {

          const flippedBackCard = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false };

        }else {
          return c;
        }
      });

      setCards(flippedBackCard);

      setFlippedCards([]);

    }, 1000);
    }

    setMoves ((prev) => prev + 1);
  }
  };
  
  return( 
    <div className="App">
      <GameHeader score={score} moves={moves} onReset={() => {}} />

        <div className="cards-grid">
          {cards.map((card) => (
            <Card card={card} onClick={handleCardClick} />
          ))}
        </div>  

    </div>
  );
}

export default App
