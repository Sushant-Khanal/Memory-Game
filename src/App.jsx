import { GameHeader } from "./components/GameHeader";
import { Card } from "./components/Card";
import { useEffect, useState } from "react";
import { WinMessage } from "./components/WinMessage";
import { useGameLogic } from "./hooks/useGameLogic";

const cardValues = [
  "🍎","🍌","🍇","🍊","🍓","🍑","🍍","🥝",
  "🍎","🍌","🍇","🍊","🍓","🍑","🍍","🥝",
];

function App() {
  const {
    cards, 
    handleCardClick, 
    score, 
    moves, 
    initializeGame, 
    combo, 
    showCombo, 
    setShowCombo, 
    isGameComplete,
  } = useGameLogic(cardValues);

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
