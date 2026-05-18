export const Card = ({ card, onClick, index }) => {
  return (
    <div
      className={`card ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""}`}
      onClick={() => onClick(card)}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-front-pattern">
            <div className="diamond-grid" />
            <span className="card-question">?</span>
          </div>
          <div className="card-corner top-left">♦</div>
          <div className="card-corner bottom-right">♦</div>
        </div>
        <div className="card-back">
          <span className="card-emoji">{card.value}</span>
          {card.isMatched && <div className="match-shine" />}
        </div>
      </div>
    </div>
  );
};
