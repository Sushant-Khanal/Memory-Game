export const GameHeader = ({ score, moves, onReset, total }) => {
  const progress = (score / total) * 100;

  return (
    <header className="game-header">
      <div className="header-top">
        <div className="title-block">
          <div className="title-badge">MEMORY</div>
          <h1 className="game-title">Card Royale</h1>
          <p className="game-subtitle">Match all pairs to win</p>
        </div>
        <button className="reset-btn" onClick={onReset}>
          <span className="reset-icon">↺</span>
          <span>New Game</span>
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <span className="stat-value">{score}</span>
            <span className="stat-label">Pairs Found</span>
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
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="progress-label">{score} / {total} pairs</span>
      </div>
    </header>
  );
};
