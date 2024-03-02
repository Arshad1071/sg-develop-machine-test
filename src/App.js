import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currentNumbers, setCurrentNumbers] = useState(Array(6).fill(0));
  const [isSpinning, setIsSpinning] = useState(false);
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);

  const startSpin = () => {
    setIsSpinning(true);
    setIsResultDisplayed(false);
  };

  useEffect(() => {
    const spinDuration = 8000; // Set the duration of the spin (in milliseconds)
    let startTime;
    let animationFrameId;

    const spinAnimation = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / spinDuration, 1);

      if (progress < 1) {
        const newNumbers = Array(6)
          .fill()
          .map(() => Math.floor(Math.random() * 10));
        setCurrentNumbers(newNumbers);
        animationFrameId = requestAnimationFrame(spinAnimation);
      } else {
        setIsSpinning(false);
        setIsResultDisplayed(true);
        // Generate final numbers after the spin is complete
        const newNumbers = Array(6)
          .fill()
          .map(() => Math.floor(Math.random() * 10));
        setCurrentNumbers(newNumbers);
      }
    };

    if (isSpinning) {
      animationFrameId = requestAnimationFrame(spinAnimation);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isSpinning]);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>Lottery Spinner</h2>
          <div className="spinner-container">
            <div className={`spinner-numbers ${isSpinning ? "spinning" : ""}`}>
              {currentNumbers.map((number, index) => (
                <div key={index} className="spinner-number">
                  {number}
                </div>
              ))}
            </div>
          </div>
          <button
            style={{ marginTop: "20px" }}
            onClick={startSpin}
            disabled={isSpinning}
          >
            {isSpinning ? "Spinning..." : "Spin"}
          </button>
          {isResultDisplayed && (
            <div className="result">
              <h3 className="prize-word">First Prize</h3>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
