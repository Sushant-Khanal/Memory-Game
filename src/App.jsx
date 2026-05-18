import { useState } from "react";
import { GameHeader } from "./components/GameHeader";
import { Card } from "./components/Card";
import { WinMessage } from "./components/WinMessage";
import { NameEntry } from "./components/NameEntry";
import { Leaderboard } from "./components/Leaderboard";
import { useGameLogic } from "./hooks/useGameLogic";

const cardValues = [
  "🍎","🍌","🍇","🍊","🍓","🍑","🍍","🥝",
  "🍎","🍌","🍇","🍊","🍓","🍑","🍍","🥝",
];

const LS_KEY = "card_royale_leaderboard";

const loadLeaderboard = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
  catch { return []; }
};

const saveScore = (name, moves, time) => {
  const entries = loadLeaderboard().map((e) => ({ ...e, isLatest: false }));
  entries.push({ name, moves, time, isLatest: true });
  entries.sort((a, b) => a.moves - b.moves || a.time - b.time);
  const trimmed = entries.slice(0, 10);
  localStorage.setItem(LS_KEY, JSON.stringify(trimmed));
  return trimmed;
};

function App() {
  const [playerName, setPlayerName] = useState("");
  const [gamePhase, setGamePhase] = useState("name-entry"); // "name-entry" | "playing"
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardEntries, setLeaderboardEntries] = useState(loadLeaderboard);
  const [scoreSaved, setScoreSaved] = useState(false);

  const {
    cards, score, moves, combo, showCombo,
    elapsedTime, isGameComplete, initializeGame, handleCardClick,
  } = useGameLogic(cardValues);

  // Save score once when game completes
  if (isGameComplete && !scoreSaved && gamePhase === "playing") {
    const updated = saveScore(playerName, moves, elapsedTime);
    setLeaderboardEntries(updated);
    setScoreSaved(true);
  }

  const handleStart = (name) => {
    setPlayerName(name);
    setGamePhase("playing");
    setScoreSaved(false);
    initializeGame();
  };

  // Same player, fresh game — skips name entry
  const handlePlayAgain = () => {
    setScoreSaved(false);
    initializeGame();
  };

  // Go back to name entry screen — new player
  const handleHome = () => {
    setScoreSaved(false);
    setPlayerName("");
    setGamePhase("name-entry");
    initializeGame();
  };

  // New Game button in the header also returns to name entry
  const handleHeaderReset = () => {
    setScoreSaved(false);
    setPlayerName("");
    setGamePhase("name-entry");
    initializeGame();
  };

  if (gamePhase === "name-entry") {
    return (
      <>
        <div className="ambient-bg" />
        <div className="felt-texture" />
        <NameEntry onStart={handleStart} />
      </>
    );
  }

  return (
    <div className="app">
      <div className="ambient-bg" />
      <div className="felt-texture" />

      <GameHeader
        score={score}
        moves={moves}
        elapsedTime={elapsedTime}
        onReset={handleHeaderReset}
        onLeaderboard={() => setShowLeaderboard(true)}
        total={cardValues.length / 2}
        playerName={playerName}
      />

      {showCombo && combo >= 2 && (
        <div className="combo-popup">🔥 {combo}x Combo!</div>
      )}

      {isGameComplete && (
        <WinMessage
          moves={moves}
          score={score}
          elapsedTime={elapsedTime}
          onPlayAgain={handlePlayAgain}
          onHome={handleHome}
          onViewLeaderboard={() => setShowLeaderboard(true)}
        />
      )}

      {showLeaderboard && (
        <Leaderboard
          entries={leaderboardEntries}
          currentPlayer={playerName}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

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
