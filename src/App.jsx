import { GameHeader } from "./components/GameHeader";
import { Card } from "./components/Card";
import { useEffect, useState } from "react";
import { WinMessage } from "./components/WinMessage";

const cardValues = [
  "🍎","🍌","🍇","🍊","🍓","🍑","🍍","🥝",
  "🍎","🍌","🍇","🍊","🍓","🍑","🍍","🥝",
];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const initializeGame = () => {
    const shuffled = shuffleArray(cardValues);
    const finalCards = shuffled.map((value, index) => ({
      id: index, value, isFlipped: false, isMatched: false,
    }));
    setCards(finalCards);
    setIsLocked(false);
    setMoves(0);
    setScore(0);
    setFlippedCards([]);
    setMatchedCards([]);
    setCombo(0);
  };

  useEffect(() => { initializeGame(); }, []);

  const handleCardClick = (card) => {
    if (card.isFlipped || card.isMatched || isLocked || flippedCards.length === 2) return;

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    if (flippedCards.length === 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];

      if (firstCard.value === card.value) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          setScore((prev) => prev + 1);
          setCombo((prev) => {
            const newCombo = prev + 1;
            if (newCombo >= 2) {
              setShowCombo(true);
              setTimeout(() => setShowCombo(false), 1500);
            }
            return newCombo;
          });
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === card.id
                ? { ...c, isMatched: true }
                : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        setCombo(0);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newFlippedCards.includes(c.id) || c.id === card.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setIsLocked(false);
          setFlippedCards([]);
        }, 1000);
      }

      setMoves((prev) => prev + 1);
    }
  };

  const isGameComplete = matchedCards.length === cardValues.length;

  return (
    <div className="app">
      <div className="ambient-bg" />
      <div className="felt-texture" />

      <GameHeader score={score} moves={moves} onReset={initializeGame} total={cardValues.length / 2} />

      {showCombo && combo >= 2 && (
        <div className="combo-popup">
          🔥 {combo}x Combo!
        </div>
      )}

      {isGameComplete && <WinMessage moves={moves} score={score} onReset={initializeGame} />}

      <div className="cards-grid">
        {cards.map((card, i) => (
          <Card key={card.id} card={card} onClick={handleCardClick} index={i} />
        ))}
      </div>

      <div className="footer-glow" />
    </div>
  );
}

export default App;
