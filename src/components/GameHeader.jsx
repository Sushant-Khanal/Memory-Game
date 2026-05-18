export const GameHeader = ({ score, moves, elapsedTime, onReset, onLeaderboard, total, playerName }) => {
  const progress = (score / total) * 100;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <header className="game-header">
      <div className="header-top">
        <div className="title-block">
          <div className="title-badge">MEMORY</div>
          <h1 className="game-title">Card Royale</h1>
          {playerName && (
            <p className="game-player">👤 {playerName}</p>
          )}
        </div>
        <div className="header-actions">
          <button className="lb-icon-btn" onClick={onLeaderboard} title="Leaderboard">
            🏅
          </button>
          <button className="reset-btn" onClick={onReset}>
            <span className="reset-icon">↺</span>
            <span>New Game</span>
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <span className="stat-value">{score}</span>
            <span className="stat-label">Pairs</span>
          </div>
        </div>
        <div className="stat-divider" />
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <span className="stat-value">{moves}</span>
            <span className="stat-label">Moves</span>
          </div>
        </div>
        <div className="stat-divider" />
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-info">
            <span className="stat-value">{formatTime(elapsedTime)}</span>
            <span className="stat-label">Time</span>
          </div>
        </div>
        <div className="stat-divider" />
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <span className="stat-value">
              {moves > 0 ? Math.round((score / moves) * 100) : 0}%
            </span>
            <span className="stat-label">Accuracy</span>
          </div>
        </div>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-label">{score} / {total} pairs</span>
      </div>
    </header>
  );
};
