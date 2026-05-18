export const Leaderboard = ({ entries, currentPlayer, onClose }) => {
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="lb-overlay" onClick={onClose}>
      <div className="lb-modal" onClick={(e) => e.stopPropagation()}>
        <div className="lb-top-line" />

        <div className="lb-header">
          <div>
            <div className="lb-badge">HALL OF FAME</div>
            <h2 className="lb-title">Leaderboard</h2>
          </div>
          <button className="lb-close" onClick={onClose}>✕</button>
        </div>

        {entries.length === 0 ? (
          <div className="lb-empty">
            <span className="lb-empty-icon">🎯</span>
            <p>No scores yet. Be the first!</p>
          </div>
        ) : (
          <div className="lb-table">
            <div className="lb-table-head">
              <span>Rank</span>
              <span>Player</span>
              <span>Moves</span>
              <span>Time</span>
            </div>
            <div className="lb-table-body">
              {entries.map((entry, i) => {
                const isCurrentPlayer = entry.name === currentPlayer && entry.isLatest;
                return (
                  <div
                    key={i}
                    className={`lb-row ${i < 3 ? `lb-row-top-${i + 1}` : ""} ${isCurrentPlayer ? "lb-row-current" : ""}`}
                  >
                    <span className="lb-rank">{getRankIcon(i + 1)}</span>
                    <span className="lb-name">
                      {entry.name}
                      {isCurrentPlayer && <span className="lb-you-badge">YOU</span>}
                    </span>
                    <span className="lb-moves">{entry.moves}</span>
                    <span className="lb-time">{formatTime(entry.time)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button className="lb-play-btn" onClick={onClose}>
          Back to Game
        </button>
      </div>
    </div>
  );
};
