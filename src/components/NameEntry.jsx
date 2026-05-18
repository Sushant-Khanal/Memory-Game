import { useState } from "react";

export const NameEntry = ({ onStart }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name to continue.");
      return;
    }
    if (trimmed.length > 20) {
      setError("Name must be 20 characters or fewer.");
      return;
    }
    onStart(trimmed);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="name-entry-overlay">
      <div className="name-entry-modal">
        <div className="name-entry-top-line" />

        <div className="name-entry-icon">🃏</div>
        <h1 className="name-entry-title">Card Royale</h1>
        <p className="name-entry-subtitle">Match pairs. Beat the clock. Top the board.</p>

        <div className="name-entry-field">
          <label className="name-entry-label">Your Name</label>
          <input
            className={`name-entry-input ${error ? "input-error" : ""}`}
            type="text"
            placeholder="Enter your name..."
            value={name}
            maxLength={20}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            onKeyDown={handleKey}
            autoFocus
          />
          {error && <span className="name-entry-error">{error}</span>}
          <span className="name-entry-count">{name.length} / 20</span>
        </div>

        <button className="name-entry-btn" onClick={handleSubmit}>
          Start Playing
        </button>

        <p className="name-entry-hint">↑ Your score will appear on the leaderboard</p>
      </div>
    </div>
  );
};
