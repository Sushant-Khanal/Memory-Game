export const WinMessage = ({ moves, score, onReset }) => {
  const getRating = () => {
    if (moves <= 16) return { stars: "★★★", label: "Legendary", color: "#ffd700" };
    if (moves <= 22) return { stars: "★★☆", label: "Expert", color: "#c0c0c0" };
    return { stars: "★☆☆", label: "Novice", color: "#cd7f32" };
  };

  const rating = getRating();

  return (
    <div className="win-overlay">
      <div className="win-modal">
        <div className="win-confetti">
          {["🎊","✨","🎉","💫","⭐","🎊","✨","🎉"].map((e, i) => (
            <span key={i} className="confetti-piece" style={{ animationDelay: `${i * 150}ms`, left: `${10 + i * 11}%` }}>{e}</span>
          ))}
        </div>

        <div className="win-icon">🏆</div>
        <h2 className="win-title">Victory!</h2>
        <p className="win-subtitle">All pairs matched</p>

        <div className="win-rating" style={{ color: rating.color }}>
          <span className="win-stars">{rating.stars}</span>
          <span className="win-rank">{rating.label}</span>
        </div>

        <div className="win-stats">
          <div className="win-stat">
            <span className="win-stat-value">{score}</span>
            <span className="win-stat-label">Pairs</span>
          </div>
          <div className="win-stat-divider" />
          <div className="win-stat">
            <span className="win-stat-value">{moves}</span>
            <span className="win-stat-label">Moves</span>
          </div>
          <div className="win-stat-divider" />
          <div className="win-stat">
            <span className="win-stat-value">{Math.round((score / moves) * 100)}%</span>
            <span className="win-stat-label">Accuracy</span>
          </div>
        </div>

        <button className="play-again-btn" onClick={onReset}>
          Play Again
        </button>
      </div>
    </div>
  );
};
