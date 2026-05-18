import { useEffect, useRef, useState } from "react";

export const useGameLogic = (cardValues) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    stopTimer();
    const shuffled = shuffleArray(cardValues);
    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
    setIsLocked(false);
    setMoves(0);
    setScore(0);
    setMatchedCards([]);
    setFlippedCards([]);
    setCombo(0);
    setShowCombo(false);
    setElapsedTime(0);
    setGameStarted(false);
  };

  useEffect(() => {
    initializeGame();
    return () => stopTimer();
  }, []);

  const handleCardClick = (card) => {
    if (
      card.isFlipped ||
      card.isMatched ||
      isLocked ||
      flippedCards.length === 2
    ) return;

    // Start timer on first card click
    if (!gameStarted) {
      setGameStarted(true);
      startTimer();
    }

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
          const newMatchedCards = [...matchedCards, firstCard.id, card.id];
          setMatchedCards(newMatchedCards);
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
              c.id === card.id || c.id === firstCard.id
                ? { ...c, isMatched: true }
                : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);

          // Stop timer when all matched
          if (newMatchedCards.length === cardValues.length) {
            stopTimer();
          }
        }, 500);
      } else {
        setCombo(0);
        setTimeout(() => {
          setCards(
            newCards.map((c) =>
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

  return {
    cards,
    score,
    moves,
    combo,
    showCombo,
    elapsedTime,
    isGameComplete,
    initializeGame,
    handleCardClick,
  };
};
