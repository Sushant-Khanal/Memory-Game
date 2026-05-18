import { GameHeader } from "./components/GameHeader";
import { Card } from "./components/Card";

const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🍑",
  "🍍",
  "🥝",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🍑",
  "🍍",
  "🥝",
];


function App() {
  
  return( 
    <div className="App">
      <GameHeader score={0} moves={0} onReset={() => {}} />

        <div className="cards-grid">
          {cardValues.map((card) => (
            <Card card={card} />
          ))}
        </div>  

    </div>
  );
}

export default App
